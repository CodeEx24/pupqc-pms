import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import StudentClassGrade from '../../../../models/StudentClassGrade';
import Class from '../../../../models/Class';
import {
  convertGradeToPercentage,
  getCurrentSemesterData,
} from '../../../../utils/data';
import SimpleLinearRegression from 'ml-regression-simple-linear';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send('Signin required');
  }

  if (session.user.isAdmin === 2 || session.user.isAdmin === 0) {
    return res.status(401).send('Unauthorized Access');
  }

  const { studentId } = req.query;
  console.log('studentId: ', studentId);

  const currentYear = getCurrentSemesterData().currentYear;

  await db.connect();

  const studentClassGrade = await StudentClassGrade.find({
    student_id: studentId,
  }).select('class_id grade');

  // Calculate average grade for each class
  const averageGrades = {};

  studentClassGrade.forEach((entry) => {
    const { class_id, grade } = entry;

    if (!averageGrades[class_id]) {
      averageGrades[class_id] = {
        sum: grade,
        count: 1,
      };
    } else {
      averageGrades[class_id].sum += grade;
      averageGrades[class_id].count++;
    }
  });

  const result = [];

  for (const class_id in averageGrades) {
    const averageGrade =
      averageGrades[class_id].sum / averageGrades[class_id].count;
    result.push({
      class_id,
      average: averageGrade,
    });
  }

  const columnData = [];

  for (const item of result) {
    const classData = await Class.findOne({ _id: item.class_id });

    if (classData) {
      columnData.push({
        averagePercentage: convertGradeToPercentage(item.average),
        year: classData.batch,
      });
    }
  }

  const columnDataWithoutZeroes = columnData.filter(
    (item) => item.averagePercentage !== 0
  );

  const xYear = columnDataWithoutZeroes.map((data) => parseInt(data.year));
  const yPercentage = columnDataWithoutZeroes.map(
    (data) => data.averagePercentage
  );

  const regression = new SimpleLinearRegression(xYear, yPercentage);
  const slope = regression.slope;

  const json = regression.toJSON();

  const loaded = SimpleLinearRegression.load(json);

  columnDataWithoutZeroes.push({
    averagePercentage: Math.round(loaded.predict(Number(currentYear))),
    year: `${currentYear}`,
  });

  console.log(columnDataWithoutZeroes);

  await db.disconnect();

  res.status(200).json({ studentPerformance: columnDataWithoutZeroes, slope });
};

export default handler;
