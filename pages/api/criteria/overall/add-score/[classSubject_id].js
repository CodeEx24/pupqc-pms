// /api/subject/class - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import ClassSubject from '../../../../../models/ClassSubject';
import CriteriaOverallScores from '../../../../../models/CriteriaOverallScores';
import StudentRecords from '../../../../../models/StudentRecords';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session.user.isAdmin) {
    return res.status(401).send('Signin required');
  }

  const classSubject_id = req.query.classSubject_id;
  // console.log('CLASS SUBJECT 2 UPDATE: ', classSubject_id);

  const { item, inputValue: value } = req.body;

  await db.connect();

  const classSubject = await ClassSubject.findOne({ _id: classSubject_id });

  const teacherId = classSubject.teacher_id.toString();

  if (teacherId !== session.user._id) {
    await db.disconnect();
    return res.status(401).send('Unauthorized user');
  }

  // console.log('3 VALUES: ', item, value, length);

  const itemFormatted = item.toLowerCase().replace(' ', '_');

  const criteriaOverallScores = await CriteriaOverallScores.findOne({
    classSubject_id,
  });

  if (criteriaOverallScores) {
    criteriaOverallScores.criteria_overall = {
      ...criteriaOverallScores.criteria_overall,
      [itemFormatted]: [
        ...criteriaOverallScores.criteria_overall[itemFormatted],
        Number(value),
      ],
    };
  }

  await criteriaOverallScores.save();

  // For eact students record length and provide 0 for everytime teacher add something

  console.log('CLASSD OVERALL ID: ', criteriaOverallScores._id);

  const studentRecordsData = await StudentRecords.find({
    criteriaOverallScores_id: criteriaOverallScores._id,
  });

  // Map this students and update their records with initially 0 scores of their score.
  console.log('ALL STUDENTS: ', studentRecordsData);

  const studentRecordsUpdate = studentRecordsData.map((item) => {
    item.records = {
      ...item.records,
      [itemFormatted]: [...item.records[itemFormatted], 0],
    };
    return item;
  });

  for (const record of studentRecordsUpdate) {
    const result = await record.save();

    console.log(result);
  }

  await db.disconnect();

  res.status(200).json({ message: 'Successfully updated' });
};

export default handler;
