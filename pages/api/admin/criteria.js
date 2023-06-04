// /api/criteria - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import Criteria from '../../../models/Criteria';

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

  const criteria = await Criteria.find({});

  const criteriaRecord = criteria.map((criteria) => {
    return {
      name: criteria.name,
      _id: criteria._id,
    };
  });
  await db.disconnect();

  res.send(criteriaRecord);
};

export default handler;
