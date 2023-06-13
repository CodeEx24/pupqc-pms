// /api/subject/class - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import CriteriaOverallScores from '@/models/CriteriaOverallScores';
import ClassSubject from '@/models/ClassSubject';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 2 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  const classSubject_id = req.query.id;

  await db.connect();

  const classSubject = await ClassSubject.findOne({ _id: classSubject_id });

  console.log('classSubject: ', classSubject);
  const isGradeFinalized = classSubject.isGradeFinalized;
  console.log('isGradeFinalized: ', isGradeFinalized);

  const teacherId = classSubject.teacher_id.toString();

  if (teacherId !== session.user._id) {
    await db.disconnect();
    return res.status(401).send('Unauthorized user');
  }

  const criteriaOverallScores = await CriteriaOverallScores.findOne({
    classSubject_id,
  });

  await db.disconnect();

  res.status(200).json({ criteriaOverallScores, isGradeFinalized });
};

export default handler;
