import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import Teacher from '../../../models/Teacher';
import Student from '../../../models/Student';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session.user.isAdmin) {
    return res.status(401).send('Signin required');
  }

  const { data, type } = req.body;
  console.log(data);
  const userType = type === 'Teacher' ? Teacher : Student;
  console.log(userType);
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
