// /api/admin/subject/code - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import Teacher from '../../../../models/Teacher';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  await db.connect();

  const facultyMembers = await Teacher.find({ isActive: true }).select(
    'name facultyType'
  );
  console.log(facultyMembers);

  await db.disconnect();

  res.status(200).json(facultyMembers);
};

export default handler;
