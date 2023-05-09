import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import CriteriaOverallScores from '@/models/CriteriaOverallScores';
import StudentRecords from '@/models/StudentRecords';
import Student from '@/models/Student';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session.user.isAdmin) {
    return res.status(401).send('Signin required');
  }

  const { studentId, classSubjectId } = req.query;

  await db.connect();

  const criteriaOverall = await CriteriaOverallScores.findOne({
    classSubject_id: classSubjectId,
  }).select('_id');

  const { name, email } = await Student.findOne({ _id: studentId }).select(
    'name email'
  );

  const studentRecord = await StudentRecords.findOne({
    criteriaOverallScores_id: criteriaOverall._id,
    student_id: studentId,
  });

  console.log('STUDENT RECORD', studentRecord);

  await db.disconnect();

  const updatedStudentRecord = {
    ...studentRecord.toObject(),
    name: name,
    email: email,
  };

  res.json({ studentRecord: updatedStudentRecord });
};

export default handler;

// SHORTER CODE ONLY
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/pages/api/auth/[...nextauth]';

// import db from '@/utils/db';

// import Class from '../../../models/Class';
// import Student from '../../../models/Student';
// import ClassSubject from '../../../models/ClassSubject';

// const handler = async (req, res) => {
//   const session = await getServerSession(req, res, authOptions);

//   const { isAdmin, _id: teacher_id } = session.user;

//   if (!isAdmin) {
//     return res.status(401).send('Signin required');
//   }

//   await db.connect();

//   const classSubject = await ClassSubject.find({ teacher_id });

//   const allStudentRecords = await Promise.all(
//     classSubject.map(async ({ class_id, subject_id }) => {
//       const classData = await Class.findOne({ _id: class_id });

//       return Promise.all(
//         classData.student_id.map(async (id) => {
//           const studentData = await Student.findOne({ _id: id });
//           return {
//             subject_id,
//             student_id: studentData.name,
//             email: studentData.email,
//             mobileNo: studentData.mobileNo,
//             class_name:
//               classData.name + ' ' + classData.year + '-' + classData.section,
//             batch: classData.batch,
//           };
//         })
//       );
//     })
//   ).then((data) => [].concat(...data));

//   const uniqueValues = allStudentRecords.reduce(
//     (acc, cur) => {
//       acc.batches.add(cur.batch);
//       acc.classNames.add(cur.class_name);
//       return acc;
//     },
//     { batches: new Set(), classNames: new Set() }
//   );

//   res.json({
//     data: allStudentRecords,
//     batchList: [...uniqueValues.batches],
//     classList: [...uniqueValues.classNames],
//   });
// };

// export default handler;
