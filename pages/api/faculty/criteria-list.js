// /api/subject - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';

import Criteria from '@/models/Criteria';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session.user.isAdmin) {
    return res.status(401).send('Signin required');
  }

  const { _id: teacher_id } = session.user;

  await db.connect();

  const criteria = await Criteria.find({ teacher_id });

  await db.disconnect();

  res.status(200).json(criteria);
};

export default handler;
