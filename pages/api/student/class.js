import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';

import Class from '@/models/Class';
import Student from '@/models/Student';
import ClassSubject from '@/models/ClassSubject';
import Course from '@/models/Course';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session.user.isAdmin) {
    return res.status(401).send('Signin required');
  }

  await db.connect();

  const classSubject = await ClassSubject.find({
    teacher_id: session.user._id,
  });

  const allStudentRecords = await Promise.all(
    classSubject.map(
      async ({
        _id: class_subject_id,
        class_id,
        subject_id,
        semester,
        isGradeFinalized,
      }) => {
        const classData = await Class.findOne({ _id: class_id });
        const { course_code } = await Course.findOne({
          _id: classData.course_id,
        });
        const semesterString =
          semester === 1
            ? '1st Semester'
            : semester === 2
            ? '2nd Semester'
            : 'Summer Term';

        return await Promise.all(
          classData.student_id.map(async (id) => {
            const studentData = await Student.findOne({ _id: id });
            return {
              student_name: studentData.name,
              student_id: studentData._id,
              subject_id,
              class_subject_id,
              class_name:
                course_code + ' ' + classData.year + '-' + classData.section,
              batch: classData.batch,
              semester: semesterString,
              isGradeFinalized,
            };
          })
        );
      }
    )
  );

  const flattenedStudentsRecordData = allStudentRecords.flat();
  const uniqueValues = flattenedStudentsRecordData.reduce(
    (acc, cur) => {
      if (!acc.batches.includes(cur.batch)) {
        acc.batches.push(cur.batch);
      }
      if (!acc.classNames.includes(cur.class_name)) {
        acc.classNames.push(cur.class_name);
      }
      return acc;
    },
    { batches: [], classNames: [] }
  );

  await db.disconnect();

  res.json({
    data: flattenedStudentsRecordData,
    batchList: uniqueValues.batches,
    classList: uniqueValues.classNames,
  });
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
