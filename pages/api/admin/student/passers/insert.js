//  /api/subject/insert - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import StudentPassers from '../../../../../models/StudentPassers';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  const { student_id, examTypeVal: title, scores } = req.body;

  await db.connect();

  console.log(
    ' student_id, examTypeVal: title, scores : ',
    student_id,
    title,
    scores
  );

  console.log(typeof scores);

  const studentPassersExist = await StudentPassers.findOne({ student_id });

  if (studentPassersExist) {
    await db.disconnect();
    return res.status(409).send({
      message: 'Student Passer already exist',
    });
  }

  const newStudentPassers = new StudentPassers({
    student_id,
    title,
    scores,
  });

  await newStudentPassers.save();

  await db.disconnect();

  return res
    .status(201)
    .send({ message: 'Student passers successfully listed' });
};

export default handler;
