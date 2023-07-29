//  /api/subject/insert - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import FacultyAchievement from '../../../../../models/FacultyAchievement';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  const { faculty_id: teacher_id, achievementType, title } = req.body;

  await db.connect();

  const newFacultyAchievement = new FacultyAchievement({
    teacher_id,
    achievementType,
    title,
  });

  await newFacultyAchievement.save();

  await db.disconnect();

  return res
    .status(201)
    .send({ message: 'Faculty achievement created successfully' });
};

export default handler;
