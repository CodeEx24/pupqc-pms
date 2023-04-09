//  /api/orders/:id

import { getSession } from 'next-auth/react';

import db from '@/utils/db';
import Subject from '@/models/Subject';

const handler = async (req, res) => {
  const session = await getSession({ req });
  console.log('SESSION: ', session);
  if (!session) {
    return res.status(401).send('Signin required');
  }

  await db.connect();

  const subject = await Subject.find({ teacher_id: req.query.id });

  await db.disconnect();

  res.send(subject);
};

export default handler;
