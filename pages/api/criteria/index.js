import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import Criteria from '../../../models/Criteria';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send('Signin required');
  }
  const teacherID = session.user._id;

  await db.connect();

  const criteria = await Criteria.find({ teacher_id: teacherID });

  const criteriaRecord = criteria.map((criteria) => {
    return {
      name: criteria.name,
      id: criteria._id,
    };
  });

  res.send(criteriaRecord);
};

export default handler;
