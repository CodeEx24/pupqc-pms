import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import db from '@/utils/db';
import Class from '../../../../../models/Class';
import { getCurrentSemesterData } from '../../../../../utils/data';
import Course from '../../../../../models/Course';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send('Signin required');
  if (session.user.isAdmin === 1 || session.user.isAdmin === 0)
    return res.status(401).send('Unauthorized Access');

  const semesterDetails = getCurrentSemesterData();

  await db.connect();

  const classData = await Class.find({
    batch:
      semesterDetails.currentMonth >= 1 && semesterDetails.currentMonth <= 3
        ? semesterDetails.currentYear - 1
        : semesterDetails.currentYear,
  }).select('course_id student_id');

  const courseCounts = {};
  for (const item of classData) {
    const { course_id, student_id } = item;
    const { course_code } = await Course.findOne({ _id: course_id });
    if (!courseCounts[course_code]) {
      courseCounts[course_code] = 0;
    }
    courseCounts[course_code] += student_id.length;
  }

  const courseCountResult = Object.entries(courseCounts).map(
    ([course, count]) => ({
      x: course,
      y: count,
    })
  );

  await db.disconnect();

  return res.status(200).json(courseCountResult);
}
