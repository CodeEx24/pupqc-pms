import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import db from '@/utils/db';

import { getCurrentSemesterData } from '@/utils/data';
import Class from '@/models/Class';
import ClassSubject from '@/models/ClassSubject';
import Teacher from '@/models/Teacher';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send('Signin required');
  if (session.user.isAdmin === 1 || session.user.isAdmin === 0)
    return res.status(401).send('Unauthorized Access');

  await db.connect();

  const semesterDetails = getCurrentSemesterData();

  const classData = await Class.find({
    batch:
      semesterDetails.semester === 1 &&
      (semesterDetails.currentMonth >= 1 || semesterDetails.currentMonth <= 3)
        ? semesterDetails.currentYear - 1
        : semesterDetails.currentYear,
  });

  const activeData = await Promise.all(
    classData.map(async (item) => {
      const classSubject = await ClassSubject.findOne({
        class_id: item._id,
        semester: semesterDetails.semester,
      });

      if (classSubject && !classSubject.isGradeFinalized) {
        return {
          studentCount: item.student_id.length,
          classCount: 1,
        };
      }

      return {
        studentCount: 0,
        classCount: 0,
      };
    })
  );

  const activeStudentCount = activeData.reduce(
    (total, data) => total + data.studentCount,
    0
  );
  const activeClassCount = activeData.reduce(
    (total, data) => total + data.classCount,
    0
  );

  const teacherData = await Teacher.find({}).select('isActive');

  const activeTeacherCount = teacherData.reduce(
    (count, teacher) => (teacher.isActive ? count + 1 : count),
    0
  );

  await db.disconnect();

  return res
    .status(200)
    .json({ activeStudentCount, activeClassCount, activeTeacherCount });
}
