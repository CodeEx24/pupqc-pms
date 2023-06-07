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
  // console.log('DATA2: ', class_id, semester);

  await db.connect();

  const classSubjects = await ClassSubject.find({ class_id, semester });
  // console.log('CLASS SUBJECT: ', classSubjects);
  // Update isGradeFinalized for all class subjects
  const updatedClassSubjects = await Promise.all(
    classSubjects.map(async (classSubject) => {
      classSubject.isGradeFinalized = false;
      return await classSubject.save();
    })
  );

  // console.log('UPDATEDL ', updatedClassSubjects);
  await db.disconnect();
  res.send(updatedClassSubjects);
};

export default handler;
