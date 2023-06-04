// /api/criteria - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import ClassSubject from '../../../../models/ClassSubject';
// import Criteria from '../../../models/Criteria';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  const { id: class_id, semester } = req.body;
  console.log('DATA2: ', class_id, semester);

  await db.connect();

  const classSubject = await ClassSubject.find({ class_id, semester });

  console.log(classSubject);
  await db.disconnect();
  res.send(classSubject);
};

export default handler;
