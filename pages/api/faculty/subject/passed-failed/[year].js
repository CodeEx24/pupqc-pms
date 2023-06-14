// /api/subject - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import ClassSubject from '@/models/ClassSubject';
import Class from '../../../../../models/Class';
import AverageClassGrade from '../../../../../models/AverageClassGrade';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 2 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  const teacher_id = session.user._id;

  const years = [];

  for (let i = req.query.year; i >= req.query.year - 4; i--) {
    years.push(i);
  }
  console.log('years: ', years);
  console.log('teacher_id: ', teacher_id);

  await db.connect();
  const classBatch = await Promise.all(
    years.map(async (year) => {
      const classBatchItem = await Class.find({ batch: year }).select('batch');
      return [year, ...classBatchItem.map((item) => item._id.toString())];
    })
  );

  const transformedClassBatch = classBatch.reduce((acc, item) => {
    acc[item[0]] = item.slice(1);
    return acc;
  }, {});

  console.log('classBatch:', transformedClassBatch);

  const yearsVal = Object.keys(transformedClassBatch);
  const columnData = [];

  for (const year of yearsVal) {
    const classIds = transformedClassBatch[year];
    let passedCount = 0;
    let failedCount = 0;

    for (const classId of classIds) {
      const classSubjectList = await ClassSubject.find({
        teacher_id,
        class_id: classId,
        isGradeFinalized: true,
      });

      if (classSubjectList.length === 0) {
        continue;
      }

      for (const clsSubjectItem of classSubjectList) {
        const averageClassSubjectGrade = await AverageClassGrade.findOne({
          classSubject_id: clsSubjectItem._id,
        }).select('passed failed');

        passedCount += averageClassSubjectGrade.passed || 0;
        failedCount += averageClassSubjectGrade.failed || 0;
      }
    }

    columnData.push({ year, passed: passedCount, failed: failedCount });
  }

  console.log('columnData:', columnData);

  await db.disconnect();

  res.status(200).json('HELLO');
};

export default handler;
