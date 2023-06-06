//  /api/class/insert - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import ClassSubject from '../../../../models/ClassSubject';
import CriteriaOverallScores from '../../../../models/CriteriaOverallScores';
import StudentGrade from '../../../../models/StudentGrade';
import StudentRecords from '../../../../models/StudentRecords';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  const { class_subject_id } = req.query;

  await db.connect();

  const criteriaOverallScore = await CriteriaOverallScores.findOne({
    classSubject_id: class_subject_id,
  });

  await ClassSubject.deleteOne({ _id: class_subject_id });

  await CriteriaOverallScores.deleteOne({ classSubject_id: class_subject_id });

  await StudentGrade.deleteMany({ classSubject_id: class_subject_id });

  await StudentRecords.deleteMany({
    criteriaOverallScores_id: criteriaOverallScore._id,
  });

  await db.disconnect();

  res.status(201).send({ message: 'Subject created successfully' });
};

export default handler;
