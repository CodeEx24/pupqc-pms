import Student from '../../models/Student';
import Teacher from '../../models/Teacher';
import db from '../../utils/db';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Admin from '../../models/Admin';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send('Signin required');
  }

  const userId = session.user._id;

  const userType =
    session.user.isAdmin === 1
      ? Teacher
      : session.user.isAdmin === 0
      ? Student
      : Admin;

  await db.connect();

  // Check if email exists in the database
  const user = await userType
    .findById(userId)
    .select(
      'name email gender dateOfBirth mobileNo residentialAddress profileImageUrl isAdmin'
    )
    .lean();

  user.dateOfBirth = new Date(user.dateOfBirth).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  await db.disconnect();

  return res.status(200).json(user);
}
