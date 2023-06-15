import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import Student from '@/models/Student';
import Teacher from '@/models/Teacher';
import Admin from '@/models/Admin';
import db from '@/utils/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send('Signin required');
  }

  const { password, newPassword, confirmPassword, type } = req.body;

  const userType =
    type === 'Faculty' ? Teacher : type === 'Admin' ? Admin : Student;

  await db.connect();

  // Find the user by email
  const user = await userType.findOne({ email: session.user.email });

  // Check if the current password matches
  const isPasswordMatch = bcrypt.compareSync(password, user.password);

  if (!isPasswordMatch) {
    console.log('Invalid current password');
    return res.status(400).json({ message: 'Invalid current password' });
  }

  // Check if the new password and confirm password match
  if (newPassword !== confirmPassword) {
    console.log('New password and confirm password do not match');
    return res
      .status(400)
      .json({ message: 'New password and confirm password do not match' });
  }

  // Update the password
  user.password = bcrypt.hashSync(newPassword);
  await user.save();
  await db.disconnect();

  return res.status(200).json({ message: 'Password updated successfully' });
}
