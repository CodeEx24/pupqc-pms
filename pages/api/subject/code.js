// /api/subject/code - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import Subject from '@/models/Subject';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session.user.isAdmin) {
    return res.status(401).send('Signin required');
  }

  await db.connect();

  const subjects = await Subject.find({}, { _id: 1, name: 1 });

  await db.disconnect();

  const subjectData = subjects.map((item) => ({
    _id: item._id,
    name: `${item._id} - ${item.name}`,
  }));

  res.status(200).json(subjectData);
};

export default handler;
