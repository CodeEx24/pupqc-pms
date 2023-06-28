import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import ClassSubject from '../../../../models/ClassSubject';

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

  await db.connect();

  const classSubjects = await ClassSubject.find({ class_id, semester });

  // Update isGradeFinalized for all class subjects
  const updatedClassSubjects = await Promise.all(
    classSubjects.map(async (classSubject) => {
      classSubject.isGradeFinalized = false;
      return await classSubject.save();
    })
  );

  await db.disconnect();
  res.send(updatedClassSubjects);
};

export default handler;
