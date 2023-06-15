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

  const years = Array.from({ length: 5 }, (_, i) => req.query.year - i);

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

  const columnData = await Promise.all(
    Object.entries(transformedClassBatch).map(async ([year, classIds]) => {
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

      return { year, passed: passedCount, failed: failedCount };
    })
  );

  const passedValues = columnData.map((item) => item.passed);
  const failedValues = columnData.map((item) => item.failed);

  const highestValue = Math.max(...passedValues, ...failedValues);

  const range = highestValue - 0;

  const interval = Math.ceil(range / 5);
  const increment = Math.ceil(interval / 2);

  await db.disconnect();

  res.status(200).json({
    passedFailed: columnData,
    highestValue: highestValue + increment,
    interval,
  });
};

export default handler;
