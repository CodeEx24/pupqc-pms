// /api/admin/subject/code - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import Subject from '@/models/Subject';

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

  const subjects = await Subject.find({});

  await db.disconnect();

  const subjectData = subjects.map((item) => ({
    _id: item._id,
    name: `${item._id} - ${item.name}`,
  }));

  res.status(200).json(subjectData);
};

export default handler;
