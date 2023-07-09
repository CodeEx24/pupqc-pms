import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import Criteria from '@/models/Criteria';

const handler = async (req, res) => {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
      if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
        return res.status(401).send('Unauthorized Access');
      }
    } else {
      return res.status(401).send('Signin required');
    }

    const { criteriaId } = req.query;

    await db.connect();

    const criteria = await Criteria.findOne({ _id: criteriaId });

    await db.disconnect();

    return res.status(201).send(criteria);
  } catch (error) {
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

export default handler;
