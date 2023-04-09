//  /api/orders/:id

import { getSession } from 'next-auth/react';

import db from '@/utils/db';
import Class from '@/models/Class';

const handler = async (req, res) => {
  const session = await getSession({ req });
  console.log('SESSION: ', session);
  if (!session) {
    return res.status(401).send('Signin required');
  }

  await db.connect();

  const classes = await Class.findOne({ _id: req.query.id });

  await db.disconnect();
  res.send(classes);
};

export default handler;
