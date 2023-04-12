// /api/subject/class/:id

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import Subject from '@/models/Subject';
import Class from '@/models/Class';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send('Signin required');
  }

  await db.connect();

  const subject = await Subject.find({ teacher_id: req.query.id });

  const dataID = subject.map((sub) => sub.class_id);

  const classData = await Class.find({ _id: { $in: dataID } });

  const mergedData = subject.map((sub) => {
    const classRecord = classData.find((cls) => cls._id.equals(sub.class_id));
    return {
      _id: sub._id,
      subject: sub.name,
      name: classRecord.name,
      year: classRecord.year,
      section: classRecord.section,
      semester: sub.semester,
      batch: classRecord.batch,
    };
  });

  await db.disconnect();

  res.status(200).json(mergedData);
};

export default handler;
