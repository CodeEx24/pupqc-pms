import Student from '../../models/Student';
import Teacher from '../../models/Teacher';
import Admin from '../../models/Admin';
import db from '../../utils/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, type, password } = req.body;

  const userType =
    type === 'Faculty' ? Teacher : type === 'Admin' ? Admin : Student;

  await db.connect();

  // Check if email exists in the database
  const user = await userType.findOne({ email });

  user.password = bcrypt.hashSync(password);

  await user.save();

  return res.status(200).json({ message: 'Password updated successfully' });
}
