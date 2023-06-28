import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import ClassSubject from '@/models/ClassSubject';
import StudentClassSubjectGrade from '@/models/StudentClassSubjectGrade';
import AverageClassGrade from '@/models/AverageClassGrade';
import Class from '@/models/Class';
import StudentClassGrade from '@/models/StudentClassGrade';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  const { id: class_id, semester } = req.body;

  await db.connect();

  const classData = await Class.findOne({ _id: class_id }).select('student_id');

  const classSubjects = await ClassSubject.find({ class_id, semester });

  // CREATING STUDENT CLASS GRADE
  const studentClassGrades = await Promise.all(
    classData.student_id.map(async (student_id) => {
      const studentGrades = await Promise.all(
        classSubjects.map(async ({ _id: classSubject_id }) => {
          const studentClassSubjectGrades = await StudentClassSubjectGrade.find(
            {
              classSubject_id,
              student_id,
            }
          );
          const totalGrade = studentClassSubjectGrades.reduce(
            (sum, grade) => sum + grade.grade,
            0
          );
          const averageGrade = totalGrade / studentClassSubjectGrades.length;
          return {
            class_id: classData._id,
            student_id,
            grade: averageGrade,
            semester: semester, // Provide the correct semester value here
          };
        })
      );
      const combinedGrades = studentGrades.reduce(
        (acc, curr) => acc.concat(curr),
        []
      );
      const averageGrade =
        combinedGrades.reduce((sum, grade) => sum + grade.grade, 0) /
        combinedGrades.length;
      return {
        class_id: classData._id,
        student_id,
        grade: averageGrade,
        semester: semester, // Provide the correct semester value here
      };
    })
  );

  // SAVING TO THE DATABASE
  studentClassGrades.forEach(async (studentClassGradeItem) => {
    const { class_id, student_id } = studentClassGradeItem;

    const existingGrade = await StudentClassGrade.findOne({
      class_id,
      student_id,
    });

    if (existingGrade) {
      existingGrade.grade = studentClassGradeItem.grade;
      existingGrade.semester = studentClassGradeItem.semester;
      await existingGrade.save();
    } else {
      const studentClassGrade = new StudentClassGrade(studentClassGradeItem);
      await studentClassGrade.save();
    }
  });

  // CREATING AVERAGE CLASS GRADE
  const averageClassSubjectGrade = await Promise.all(
    classSubjects.map(async (classSubjectItem) => {
      const studentClassSubjectGrade = await StudentClassSubjectGrade.find({
        classSubject_id: classSubjectItem._id,
      });

      const gradeSum = studentClassSubjectGrade.reduce(
        (sum, grade) => sum + grade.grade,
        0
      );
      const grade = gradeSum / studentClassSubjectGrade.length;
      const passed = studentClassSubjectGrade.filter(
        (gradeItem) => gradeItem.grade <= 3
      ).length;
      const failed = studentClassSubjectGrade.filter(
        (gradeItem) => gradeItem.grade > 3
      ).length;

      return {
        classSubject_id: classSubjectItem._id,
        grade,
        passed,
        failed,
      };
    })
  );

  // SAVING TO THE DATA BASE
  await Promise.all(
    averageClassSubjectGrade.map(async (averageClassItem) => {
      const averageClassGradeExist = await AverageClassGrade.findOne({
        classSubject_id: averageClassItem.classSubject_id,
      });
      if (averageClassGradeExist) {
        // Update existing averageClassItem with the new average grade
        averageClassGradeExist.grade = averageClassItem.grade;
        averageClassGradeExist.passed = averageClassItem.passed;
        averageClassGradeExist.failed = averageClassItem.failed;
        await averageClassGradeExist.save();
      } else {
        // Create a new averageClassItem and save it in the database
        const newAverageClassItem = new AverageClassGrade({
          ...averageClassItem,
        });
        await newAverageClassItem.save();
      }
    })
  );

  // Update the finalize to be able to be editable
  const updatedClassSubjects = await Promise.all(
    classSubjects.map(async (classSubject) => {
      classSubject.isGradeFinalized = true;
      return await classSubject.save();
    })
  );

  // Calculate StudentClassSubjectGrades

  await db.disconnect();
  res.send(updatedClassSubjects);
};

export default handler;
