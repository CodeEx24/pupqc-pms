// /api/admin/subject/code - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import Criteria from '../../../../models/Criteria';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  const { name } = req.query;
  console.log(name);

  await db.connect();

  const isCriteriaExist = await Criteria.findOne({ name });
  await db.disconnect();

  if (isCriteriaExist) {
    res.status(409).send({ message: 'Criteria Code already exist' });
  }

  res.status(200).json('HELLO');
};

export default handler;
