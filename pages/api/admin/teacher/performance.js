import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import db from '@/utils/db';

import { getCurrentSemesterData } from '@/utils/data';
import { convertGradeToPercentage } from '@/utils/data';
import AverageClassGrade from '@/models/AverageClassGrade';
import ClassSubject from '@/models/ClassSubject';
import Class from '@/models/Class';

import SimpleLinearRegression from 'ml-regression-simple-linear';

const getClassBatch = async (years) => {
  const classBatch = await Promise.all(
    years.map(async (year) => {
      const classBatchItem = await Class.find({ batch: year }).select('batch');
      return [year, ...classBatchItem.map((item) => item._id.toString())];
    })
  );

  return classBatch.reduce((acc, item) => {
    acc[item[0]] = item.slice(1);
    return acc;
  }, {});
};

const calculateAveragePercentage = async (teacher_id, classIds) => {
  let grade = 0;
  let length = 0;

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
      }).select('grade');

      grade += averageClassSubjectGrade.grade;
      length += 1;
    }
  }

  const gradeAve = length > 0 ? grade / length : 0;
  const averagePercentage = await convertGradeToPercentage(gradeAve.toFixed(2));

  return averagePercentage;
};

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  const { teacher_id } = req.query;
  console.log('TEACHER ID: ', teacher_id);
  const { currentYear } = getCurrentSemesterData();
  console.log('SEMESTER DETAILS: ', currentYear);

  const years = Array.from({ length: 10 }, (_, i) => currentYear - i - 1);
  console.log('YEARS: ', years);

  await db.connect();
  const transformedClassBatch = await getClassBatch(years);

  const columnData = [];

  for (const [year, classIds] of Object.entries(transformedClassBatch)) {
    const averagePercentage = await calculateAveragePercentage(
      teacher_id,
      classIds
    );

    columnData.push({ year, averagePercentage });
  }

  // const columnData = [
  //   { year: '2013', averagePercentage: 90 },
  //   { year: '2014', averagePercentage: 85 },
  //   { year: '2015', averagePercentage: 92 },
  //   { year: '2016', averagePercentage: 91 },
  //   { year: '2017', averagePercentage: 88 },
  //   { year: '2018', averagePercentage: 90 },
  //   { year: '2019', averagePercentage: 87 },
  //   { year: '2020', averagePercentage: 89 },
  //   { year: '2021', averagePercentage: 88 },
  //   { year: '2022', averagePercentage: 90 },
  // ];

  const xYear = columnData.map((data) => parseInt(data.year));
  const yPercentage = columnData.map((data) => data.averagePercentage);

  console.log('xYear:', xYear);
  console.log('yPercentage:', yPercentage);

  const regression = new SimpleLinearRegression(xYear, yPercentage);
  const slope = regression.slope;

  console.log('Slope:', slope);

  if (slope > 0) {
    console.log('The trend is going higher.');
  } else if (slope < 0) {
    console.log('The trend is going lower.');
  } else {
    console.log('The trend is flat.');
  }

  const json = regression.toJSON();

  console.log('JSON FORMAT: ', json);

  const loaded = SimpleLinearRegression.load(json);

  // console.log('Predicted Percentage for 2023:', loaded.predict(2023));
  columnData.push({
    year: `${currentYear}`,
    averagePercentage: Math.round(loaded.predict(Number(currentYear))),
  });

  await db.disconnect();

  res.status(200).json({
    techerPerformance: columnData,
    slope,
  });
};

export default handler;
