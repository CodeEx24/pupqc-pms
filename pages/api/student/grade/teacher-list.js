import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';

import Class from '@/models/Class';
import Student from '@/models/Student';
import ClassSubject from '@/models/ClassSubject';
import StudentClassSubjectGrade from '@/models/StudentClassSubjectGrade';
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
    classSubject.map(async ({ class_id, subject_id, _id: classSubject_id }) => {
      const classData = await Class.findOne({ _id: class_id });
      const { course_code } = await Course.findOne({
        _id: classData.course_id,
      });
      return await Promise.all(
        classData.student_id.map(async (id) => {
          const studentData = await Student.findOne({ _id: id });

          const studentGrades = await StudentClassSubjectGrade.findOne({
            student_id: studentData._id,
            classSubject_id,
          });

          console.log(studentGrades);

          return {
            subject_id,
            profileImageUrl: studentData.profileImageUrl,
            student_id: studentData.name,
            class_name:
              course_code + ' ' + classData.year + '-' + classData.section,
            batch: classData.batch,
            grade: studentGrades.grade.toFixed(2),
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

  await db.disconnect();

  res.json({
    data: flattenedStudentsRecordData,
    batchList: uniqueValues.batches,
    classList: uniqueValues.classNames,
  });
};

export default handler;
