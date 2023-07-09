//  /api/class/insert - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import ClassSubject from '@/models/ClassSubject';
import CriteriaOverallScores from '@/models/CriteriaOverallScores';
import StudentClassSubjectGrade from '@/models/StudentClassSubjectGrade';
import StudentRecords from '@/models/StudentRecords';
import AverageClassGrade from '@/models/AverageClassGrade';

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

  // Find the document before deletion
  const classSubject = await ClassSubject.findOne({ _id: class_subject_id });

  if (!classSubject.isGradeFinalized) {
    // Delete the document
    await ClassSubject.deleteOne({ _id: class_subject_id });
    await CriteriaOverallScores.deleteOne({
      classSubject_id: class_subject_id,
    });
    await StudentClassSubjectGrade.deleteMany({
      classSubject_id: class_subject_id,
    });
    await StudentRecords.deleteMany({
      criteriaOverallScores_id: criteriaOverallScore._id,
    });

    await AverageClassGrade.deleteOne({
      classSubject_id: class_subject_id,
    });
  } else {
    res.status(409).send({
      message: 'Class subject cannot be deleted because it is finalized',
    });
  }

  await db.disconnect();

  res.status(201).send({ message: 'Subject created successfully' });
};

export default handler;
