import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';

import Class from '@/models/Class';
import Student from '@/models/Student';
import ClassSubject from '@/models/ClassSubject';
import StudentGrade from '@/models/StudentGrade';

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
    classSubject.map(async ({ class_id, subject_id, _id: classSubject_id }) => {
      const classData = await Class.findOne({ _id: class_id });

      return await Promise.all(
        classData.student_id.map(async (id) => {
          const studentData = await Student.findOne({ _id: id });

          const studentGrades = await StudentGrade.findOne({
            student_id: studentData._id,
            classSubject_id,
          });

          console.log(studentGrades);

          return {
            subject_id,
            profileImageUrl: studentData.profileImageUrl,
            student_id: studentData.name,
            class_name:
              classData.name + ' ' + classData.year + '-' + classData.section,
            batch: classData.batch,
            grade: studentGrades.grade,
          };
        })
      );
    })
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

  res.json({
    data: flattenedStudentsRecordData,
    batchList: uniqueValues.batches,
    classList: uniqueValues.classNames,
  });
};

export default handler;
