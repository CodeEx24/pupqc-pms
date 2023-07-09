//  /api/subject/insert - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Subject from '@/models/Subject';

import db from '@/utils/db';

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

  const { code: _id, name, description } = req.body;

  const subjectExist = await Subject.findOne({ _id });

  if (subjectExist) {
    await db.disconnect();
    return res.status(409).send({
      message: 'Subject code already exist',
    });
  }

  const newSubject = new Subject({
    _id,
    name,
    description,
  });

  const subject = await newSubject.save();

  await db.disconnect();

  return res
    .status(201)
    .send({ message: 'Subject created successfully', subject });
};

export default handler;
