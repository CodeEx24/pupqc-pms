import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import StudentClassGrade from '@/models/StudentClassGrade';
import Class from '@/models/Class';
import { convertGradeToPercentage } from '@/utils/data';
import SimpleLinearRegression from 'ml-regression-simple-linear';
import Course from '../../../../../models/Course';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send('Signin required');
  }

  if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
    return res.status(401).send('Unauthorized Access');
  }

  const { studentId } = req.query;
  console.log('studentId: ', studentId);

  //   const currentYear = getCurrentSemesterData().currentYear;

  await db.connect();

  const studentClassGrade = await StudentClassGrade.find({
    student_id: studentId,
  }).select('class_id grade student_id');

  const classData = await Class.findOne({ _id: studentClassGrade[0].class_id });

  console.log('studentClassGrade: ', studentClassGrade);
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

  const json = regression.toJSON();
  const loaded = SimpleLinearRegression.load(json);

  // Calculate the predicted y-value for the next year
  const nextYear = xYear[xYear.length - 1] + 1;
  const predictedPercentage = Math.round(loaded.predict(nextYear));

  const { name: courseName } = await Course.findOne({
    _id: classData.course_id,
  });

  let courseRecommendation = '';

  if (predictedPercentage >= 90) {
    // Career Suggestions for Predicted Grade 90 and above
    if (courseName === 'Bachelor of Science in Business Administration') {
      courseRecommendation =
        'High potential for a successful Business Manager or Entrepreneur.';
    } else if (courseName === 'Bachelor in Business Teacher Education') {
      courseRecommendation =
        'Likely to excel as a Business Teacher or Instructor.';
    } else if (courseName === 'Bachelor Science in Information Technology') {
      courseRecommendation =
        'Strong candidate for a career as a Software Developer or IT Consultant.';
    } else if (
      courseName === 'Bachelor of Science in Entrepreneurial Management'
    ) {
      courseRecommendation =
        'Promising future as an Entrepreneur or Business Strategist.';
    } else {
      courseRecommendation =
        'Diverse career possibilities. Encourage exploration of interests.';
    }
  } else if (predictedPercentage >= 80 && predictedPercentage < 90) {
    // Career Suggestions for Predicted Grade between 80 and 89
    if (courseName === 'Bachelor of Science in Business Administration') {
      courseRecommendation =
        'Potential for a Business Analyst, Sales Executive, or Marketing Specialist.';
    } else if (courseName === 'Bachelor in Business Teacher Education') {
      courseRecommendation =
        'Consider opportunities as a Business Trainer or Educational Consultant.';
    } else if (courseName === 'Bachelor Science in Information Technology') {
      courseRecommendation =
        'Opportunities as a Software Support Specialist, IT Technician, or Web Developer.';
    } else if (
      courseName === 'Bachelor of Science in Entrepreneurial Management'
    ) {
      courseRecommendation =
        'Options include Business Development Associate or Sales Manager roles.';
    } else {
      courseRecommendation =
        'Explore various industries and job roles to find the best fit.';
    }
  } else {
    // Default Career Recommendation for grades below 80
    courseRecommendation = 'Encourage exploration of passions and interests.';
  }

  // ... (the rest of your existing code)

  // Send the response to the administrator with the career recommendation message
  //   res.status(200).json({
  //     studentPerformance: columnDataWithoutZeroes,
  //     slope,
  //     slopeDirection,
  //     careerRecommendation: courseRecommendation, // Include the career recommendation message in the response
  //   });

  await db.disconnect();
  res.status(200).json({
    studentPerformance: columnDataWithoutZeroes,
    careerRecommendation: courseRecommendation, // Include the career recommendation message in the response
  });
  //   await db.disconnect();

  //   res.status(200).json('HELLO');
};

export default handler;
