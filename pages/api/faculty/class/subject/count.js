// /api/subject - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import Class from '../../../../../models/Class';
import ClassSubject from '../../../../../models/ClassSubject';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send('Signin required');
  }

  const { _id: teacher_id } = session.user;
  const { year, semester } = req.query;

  console.log('teacher_id: ', teacher_id);
  console.log('year: ', year, semester);

  await db.connect();
  const classList = await Class.find({ batch: year });

  const classSubject = await Promise.all(
    classList.map(async ({ _id: class_id }) => {
      const classSubjectItems = await ClassSubject.find({
        teacher_id,
        class_id,
        semester,
      });
      console.log(classSubjectItems);
      return classSubjectItems;
    })
  );

  // Count unique class_id and subject_id
  const classCountSet = new Set();
  const subjectCountSet = new Set();

  classSubject.flat().forEach((item) => {
    classCountSet.add(item.class_id.toString()); // Convert class_id to string before adding to Set
    subjectCountSet.add(item.subject_id);
  });

  const classCount = classCountSet.size;
  const subjectCount = subjectCountSet.size;

  await db.disconnect();

  res.status(200).json({
    classCount,
    subjectCount,
  });
};

export default handler;
