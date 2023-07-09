// /api/admin/subject/code - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import StudentClassGrade from '../../../../models/StudentClassGrade';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 2 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  const { studentId } = req.query;
  console.log('studentId: ', studentId);

  await db.connect();

  const studentClassGrade = await StudentClassGrade.find({
    student_id: studentId,
  });
  console.log('studentClassGrade: ', studentClassGrade);
  //   const isCriteriaExist = await Criteria.findOne({ name });
  await db.disconnect();

  //   if (isCriteriaExist) {
  //     res.status(409).send({ message: 'Criteria Code already exist' });
  //   }

  res.status(200).json('HELLO');
};

export default handler;
