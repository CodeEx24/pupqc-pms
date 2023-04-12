//  /api/orders/:id

// import { getSession } from 'next-auth/react';

import db from '@/utils/db';
import Subject from '@/models/Subject';
import Class from '@/models/Class';

const handler = async (req, res) => {
  // const session = await getSession({ req });
  // console.log('SESSION: ', session);
  // if (session) {
  //   return res.status(401).send('Signin required');
  // }

  await db.connect();

  const subject = await Subject.find({ teacher_id: req.query.id });

  const dataID = subject.map((sub) => sub.class_id);
  console.log('CLASS ID: ', dataID);

  const classData = await Class.find({ _id: { $in: dataID } });

  const data = subject.map((sub) => {
    const classRecord = classData.find((cls) => cls._id.equals(sub.class_id));
    return {
      ID: sub._id,
      Subject: sub.name,
      Name: classRecord.name,
      Year: classRecord.year,
      Section: classRecord.section,
      Semester: sub.semester,
      Batch: classRecord.batch,
    };
  });

  await db.disconnect();

  return res.json({ result: data, count: data.length });
};

export default handler;
