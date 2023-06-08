//  /api/class/insert - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import ClassSubject from '../../../../models/ClassSubject';
import CriteriaOverallScores from '../../../../models/CriteriaOverallScores';
import StudentClassSubjectGrade from '../../../../models/StudentClassSubjectGrade';
import StudentRecords from '../../../../models/StudentRecords';
import AverageClassGrade from '../../../../models/AverageClassGrade';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  const { class_subject_id } = req.query;

  await db.connect();

  const criteriaOverallScore = await CriteriaOverallScores.findOne({
    classSubject_id: class_subject_id,
  });

  // Find the document before deletion
  const classSubject = await ClassSubject.findOne({ _id: class_subject_id });
  // console.log('classSubject To Delete: ', classSubject);

  if (!classSubject.isGradeFinalized) {
    // Delete the document
    await ClassSubject.deleteOne({ _id: class_subject_id });
    await CriteriaOverallScores.deleteOne({
      classSubject_id: class_subject_id,
    });
    await StudentClassSubjectGrade.deleteMany({
      classSubject_id: class_subject_id,
    });
    await StudentRecords.deleteMany({
      criteriaOverallScores_id: criteriaOverallScore._id,
    });

    await AverageClassGrade.deleteOne({
      classSubject_id: class_subject_id,
    });
  }

  await db.disconnect();

  res.status(201).send({ message: 'Subject created successfully' });
};

export default handler;

// if (classSubject.isGradeFinalized) {
//   // Recalculate the Average Class Grade if it is Finalized (ALL SUBJECTS IN CLASS)
//   const classSubjects = await ClassSubject.find({
//     class_id: classSubject.class_id,
//     semester: classSubject.semester,
//   });
//   // console.log('classSubjects: ', classSubjects);

//   const averageClassSubjectGrade = await Promise.all(
//     classSubjects.map(async (classSubjectItem) => {
//       const studentClassSubjectGrade = await StudentClassSubjectGrade.find({
//         classSubject_id: classSubjectItem._id,
//       });

//       const gradeSum = studentClassSubjectGrade.reduce(
//         (sum, grade) => sum + grade.grade,
//         0
//       );
//       const grade = gradeSum / studentClassSubjectGrade.length;
//       const passed = studentClassSubjectGrade.filter(
//         (gradeItem) => gradeItem.grade <= 3
//       ).length;
//       const failed = studentClassSubjectGrade.filter(
//         (gradeItem) => gradeItem.grade > 3
//       ).length;

//       return {
//         classSubject_id: classSubjectItem._id,
//         grade,
//         passed,
//         failed,
//       };
//     })
//   );

//   // SAVING TO THE DATA BASE
//   await Promise.all(
//     averageClassSubjectGrade.map(async (averageClassItem) => {
//       const averageClassGradeExist = await AverageClassGrade.findOne({
//         classSubject_id: averageClassItem.classSubject_id,
//       });

//       averageClassGradeExist.grade = averageClassItem.grade;
//       averageClassGradeExist.passed = averageClassItem.passed;
//       averageClassGradeExist.failed = averageClassItem.failed;
//       await averageClassGradeExist.save();
//     })
//   );
//   console.log('res: ', res);
// }
