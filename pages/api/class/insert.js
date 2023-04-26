//  /api/class/insert - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import ClassSubject from '../../../models/ClassSubject';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send('Signin required');
  }

  const teacher_id = session.user._id;

  const { semester, subject_id, class_id, criteria_id } = req.body;

  await db.connect();

  const isExist = await ClassSubject.findOne({
    semester,
    subject_id,
    class_id,
  });

  if (isExist) {
    await db.disconnect();
    return res.status(409).send({
      message:
        'Subject cannot be added because it is currently duplicated in the class',
    });
  }

  const newClassSubject = new ClassSubject({
    semester,
    subject_id,
    class_id,
    criteria_id,
    teacher_id,
  });

  const classSubject = await newClassSubject.save();

  await db.disconnect();

  res
    .status(201)
    .send({ message: 'Subject created successfully', classSubject });
};

export default handler;
