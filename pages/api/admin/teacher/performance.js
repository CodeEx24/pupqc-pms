import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import db from '@/utils/db';

import { getCurrentSemesterData } from '@/utils/data';
import { convertGradeToPercentage } from '@/utils/data';
import AverageClassGrade from '@/models/AverageClassGrade';
import ClassSubject from '@/models/ClassSubject';
import Class from '@/models/Class';

import SimpleLinearRegression from 'ml-regression-simple-linear';
import FacultyAchievement from '../../../../models/FacultyAchievement';

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

  const { currentYear } = getCurrentSemesterData();

  const facultyAchievementExist = await FacultyAchievement.findOne({
    teacher_id,
    achievementType: 'PhD',
  });

  // ... (your existing code)

  let predictedYear;
  let phDTitle;

  if (facultyAchievementExist) {
    phDTitle = facultyAchievementExist.title;
  } else {
    const facultyAchievementPublication = await FacultyAchievement.find({
      teacher_id,
      achievementType: 'Publish Research',
    });

    // Initialize an object to store the counts for each year
    const yearCounts = {};

    // Iterate through each achievement in the array
    facultyAchievementPublication.forEach((achievement) => {
      // Extract the achievementType and year from the current achievement
      const { year } = achievement;

      // If the year doesn't exist in the yearCounts object, initialize it with a count of 1
      if (!yearCounts[year]) {
        yearCounts[year] = 1;
      } else {
        // If the year already exists, increment the count
        yearCounts[year]++;
      }
    });

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Initialize the output array
    const accumulatedCountsArray = [];

    // Iterate through the years from the current year to the earliest year in the data (2020)
    for (let year = currentYear; year >= currentYear - 5; year--) {
      // If the year exists in the yearCounts object, use the count, otherwise use 0
      const count = yearCounts[year] || 0;

      // Push the year and count as an object to the output array
      accumulatedCountsArray.push({ year, count });
    }
    accumulatedCountsArray.sort((a, b) => a.year - b.year);

    // Extract the year and averagePercentage from the input data
    const xYearPubRes = accumulatedCountsArray.map((data) =>
      parseInt(data.year)
    );
    const yCount = accumulatedCountsArray.map((data) => data.count);
    // Output the result
    console.log('xYearPubRes: ', xYearPubRes);
    console.log('yCount: ', yCount);

    // Use linear regression to predict when the count will reach 6
    const regression = new SimpleLinearRegression(xYearPubRes, yCount);
    const slope = regression.slope;
    const intercept = regression.intercept;

    // Function to calculate the year when the count will be 6
    const predictYear = (targetCount) => {
      const yearsNeeded = (targetCount - intercept) / slope;
      return Math.ceil(yearsNeeded);
    };

    // Predict the year when the count will reach 6
    const targetCount = 2;
    predictedYear = predictYear(targetCount);
    console.log(
      `Predicted year to reach ${targetCount} 'Publish Research' achievements: ${predictedYear}`
    );
  }

  const years = Array.from({ length: 10 }, (_, i) => currentYear - i - 1);

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

  const columnDataWithoutZeroes = columnData.filter(
    (item) => item.averagePercentage !== 0
  );

  const xYear = columnDataWithoutZeroes.map((data) => parseInt(data.year));
  const yPercentage = columnDataWithoutZeroes.map(
    (data) => data.averagePercentage
  );

  // console.log('xYear: ', xYear);
  // console.log('yPercentage: ', yPercentage);

  const regression = new SimpleLinearRegression(xYear, yPercentage);
  const slope = regression.slope;

  const json = regression.toJSON();

  const loaded = SimpleLinearRegression.load(json);

  columnDataWithoutZeroes.push({
    year: `${currentYear}`,
    averagePercentage: Math.round(loaded.predict(Number(currentYear))),
  });

  await db.disconnect();

  res.status(200).json({
    techerPerformance: columnDataWithoutZeroes,
    slope,
    predictedYear,
    phDTitle,
  });
};

export default handler;
