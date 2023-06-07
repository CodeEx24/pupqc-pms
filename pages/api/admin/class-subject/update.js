import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import ClassSubject from '@/models/ClassSubject';
import StudentClassSubjectGrade from '@/models/StudentClassSubjectGrade';
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
  console.log('classSubjects: ', classSubjects);

  const averageClassSubjectGrade = await Promise.all(
    classSubjects.map(async (classSubjectItem) => {
      console.log('classSubjectItem._id: ', classSubjectItem._id);
      const studentClassSubjectGrade = await StudentClassSubjectGrade.find({
        classSubject_id: classSubjectItem._id,
      });
      console.log('studentClassSubjectGrade: ', studentClassSubjectGrade);

      const gradeSum = studentClassSubjectGrade.reduce(
        (sum, grade) => Number(sum) + Number(grade.grade),
        0
      );
      console.log('gradeSum: ', gradeSum);
      const grade = gradeSum / studentClassSubjectGrade.length;
      console.log('grade: ', grade);
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

  // console.log('averageClassSubjectGrade: ', averageClassSubjectGrade);

  await Promise.all(
    averageClassSubjectGrade.map(async (averageClassItem) => {
      console.log(
        'averageClassItem.classSubjectId: ',
        averageClassItem.classSubject_id
      );
      const averageClassExist = await AverageClassGrade.findOne({
        classSubject_id: averageClassItem.classSubject_id,
      });
      console.log('averageClassExist: ', averageClassExist);
      if (averageClassExist) {
        console.log('IT EXIST');
        // Update existing averageClassItem with the new average grade
        averageClassExist.grade = Number(averageClassItem.grade);
        averageClassExist.passed = Number(averageClassItem.passed);
        averageClassExist.failed = Number(averageClassItem.failed);
        await averageClassExist.save();
      } else {
        console.log('NOTss EXIST');
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
