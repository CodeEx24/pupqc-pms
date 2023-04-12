//  /api/subject/insert

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Subject from '../../../../models/Subject';

import db from '@/utils/db';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send('Signin required');
  }

  await db.connect();

  const { name, description, semester, class_id, criteria_id } = req.body;

  const newSubject = new Subject({
    name,
    description,
    semester,
    class_id,
    criteria_id,
    teacher_id: session.user._id,
  });

  const subject = await newSubject.save();

  await db.disconnect();

  res.status(201).send({ message: 'Subject created successfully', subject });
};

export default handler;
