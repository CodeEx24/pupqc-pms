import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import Teacher from '@/models/Teacher';
import Student from '@/models/Student';
import Admin from '@/models/Admin';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session.user) {
    return res.status(401).send('Signin required');
  }

  const { data, type } = req.body;

  const userType =
    type === 'Teacher' ? Teacher : type === 'Student' ? Student : Admin;

  await db.connect();

  const user = await userType.findOne({ email: session.user.email });

  // Update the data document with the new data from the request body
  Object.assign(user, { ...data });

  // Save the updated document back to the database
  const result = await user.save();

  await db.disconnect;

  res.json({ result, message: 'User updated successfully' });
};

export default handler;
