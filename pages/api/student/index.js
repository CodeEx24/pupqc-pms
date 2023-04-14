// /api/subject/class/:id

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
const { ObjectId } = require('mongodb');

import Subject from '@/models/Subject';
import Class from '../../../models/Class';
import Student from '../../../models/Student';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session.user.isAdmin) {
    return res.status(401).send('Signin required');
  }

  const teacher_id = session.user._id;

  await db.connect();

  const subject = await Subject.find({ teacher_id: teacher_id });

  const classIdList = [
    ...new Set(subject.map((item) => new ObjectId(item.class_id).toString())),
  ].map((id) => new ObjectId(id));

  const classes = await Class.find({ _id: { $in: classIdList } });

  const studentsRecordData = await Promise.all(
    classes.map(async (item) => {
      const studentRecord = await Promise.all(
        item.student_id.map(async (studId) => {
          const studentData = await Student.findOne({ _id: studId });
          return {
            class_id: item._id,
            class_name: item.name + ' ' + item.year + '-' + item.section,
            batch: item.batch,
            student_id: studentData.name,
            email: studentData.email,
            mobileNo: studentData.mobileNo,
          };
        })
      );
      return studentRecord;
    })
  );
  await db.disconnect();

  const flattenedStudentsRecordData = studentsRecordData.flat();

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
