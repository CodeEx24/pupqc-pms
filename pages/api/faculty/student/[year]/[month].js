// /api/faculty/student/year/month - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import ClassSubject from '@/models/ClassSubject';
import Class from '@/models/Class';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session.user.isAdmin) {
    return res.status(401).send('Signin required');
  }

  const teacher_id = session.user._id;

  const { year, month } = req.query; // Extract year and month from URL parameters

  // Convert year and month to numbers if needed
  const yearNumber = Number(year);
  const semester =
    month > 9 || (month >= 1 && month <= 3)
      ? 1
      : month >= 3 && month <= 7
      ? 2
      : 3;

  console.log('YEAR NUMBER & MONTH: ', yearNumber, semester, teacher_id);

  await db.connect();

  const subject_classID = await ClassSubject.distinct('class_id', {
    teacher_id,
    semester,
    createdAt: {
      $gte: new Date(`${year}-01-01`), // Start of the year - Greater than or equal (gte)
      $lt: new Date(`${year + 1}-01-01`), // Start of the next year - Lesser than (lesser than)
    },
  });

  // DESIRED RESULT
  //   const resultMustBe = [
  //     { x: '1st Year', y: AccumulatedStudentLengthPerYearLevel },
  //     { x: '2nd Year', y: AccumulatedStudentLengthPerYearLevel },
  //     { x: '3rd Year', y: AccumulatedStudentLengthPerYearLevel },
  //     { x: '4th Year', y: AccumulatedStudentLengthPerYearLevel },
  //   ];

  const studentByYearLevel = await Promise.all(
    subject_classID.map(async (id) => {
      const classObj = await Class.findById(id.toString());
      if (classObj.year === 1) {
        const accumulatedLength = classObj.student_id.reduce(
          (totalLength, studentID) => totalLength + studentID.length,
          0
        );
        return { x: '1st Year', y: accumulatedLength };
      } else if (classObj.year === 2) {
        return { x: '2nd Year', y: classObj.student_id.length };
      } else if (classObj.year === 3) {
        return { x: '3rd Year', y: classObj.student_id.length };
      } else if (classObj.year === 4) {
        return { x: '4th Year', y: classObj.student_id.length };
      }
      return { classObj };
    })
  );

  await db.disconnect();

  res.status(200).json({ studentByYearLevel });
};

export default handler;
