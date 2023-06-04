// localhost:3000/api/admin/teacher-list

import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import Teacher from '@/models/Teacher';
import db from '@/utils/db';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  await db.connect();

  const teacher = await Teacher.find({}).select(
    'name email gender mobileNo isActive profileImageUrl'
  );

  await db.disconnect();

  return res.status(200).json(teacher);
}
