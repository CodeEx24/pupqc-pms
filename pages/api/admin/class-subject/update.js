import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import ClassSubject from '@/models/ClassSubject';
import StudentGrade from '@/models/StudentGrade';
import AverageClassGrade from '@/models/AverageClassGrade';

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
  // console.log('DATA2: ', class_id, semester);

  await db.connect();

  const classSubjects = await ClassSubject.find({ class_id, semester });
  // console.log('classSubjects: ', classSubjects);

  const averageClassGrade = await Promise.all(
    classSubjects.map(async (classSubjectItem) => {
      const studentGrades = await StudentGrade.find({
        classSubject_id: classSubjectItem._id,
      });
      // console.log('studentGrades: ', studentGrades);

      const gradeSum = studentGrades.reduce(
        (sum, grade) => sum + grade.grade,
        0
      );
      const grade = gradeSum / studentGrades.length;

      const passed = studentGrades.filter(
        (gradeItem) => gradeItem.grade <= 3
      ).length;
      const failed = studentGrades.filter(
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

  // console.log('averageClassGrade: ', averageClassGrade);

  await Promise.all(
    averageClassGrade.map(async (averageClassItem) => {
      // console.log(
      //   'averageClassItem.classSubjectId: ',
      //   averageClassItem.classSubject_id
      // );
      const averageClassExist = await AverageClassGrade.findOne({
        classSubject_id: averageClassItem.classSubject_id,
      });
      console.log('averageClassExist: ', averageClassExist);
      if (averageClassExist) {
        // Update existing averageClassItem with the new average grade
        averageClassExist.grade = averageClassItem.grade;
        averageClassExist.passed = averageClassItem.passed;
        averageClassExist.failed = averageClassItem.failed;
        await averageClassExist.save();
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

  await db.disconnect();
  res.send(updatedClassSubjects);
};

export default handler;
