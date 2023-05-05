//  /api/class/insert - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import ClassSubject from '../../../models/ClassSubject';
import CriteriaOverallScores from '../../../models/CriteriaOverallScores';
import Criteria from '../../../models/Criteria';
import Class from '../../../models/Class';
import StudentRecords from '../../../models/StudentRecords';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send('Signin required');
  }

  const teacher_id = session.user._id;

  const { semester, subject_id, class_id, criteria_id } = req.body;

  await db.connect();

  const isExist = await ClassSubject.findOne({
    semester,
    subject_id,
    class_id,
  });

  if (isExist) {
    await db.disconnect();
    return res.status(409).send({
      message:
        'Subject cannot be added because it is currently duplicated in the class',
    });
  }

  const newClassSubject = new ClassSubject({
    semester,
    subject_id,
    class_id,
    criteria_id,
    teacher_id,
  });

  const classSubject = await newClassSubject.save();

  const criteriaData = await Criteria.findById(classSubject.criteria_id);
  const criteria = criteriaData.criteria;

  // Criteia Generated for overall scores added by a teacher
  const childObjects = Object.values(criteria).slice(0, -1);
  const keys = childObjects.flatMap((obj) => Object.keys(obj));
  const criteria_overall = Object.fromEntries(keys.map((key) => [key, []]));

  // After saving generate Criteria Overall Scores for Managing the scores
  const newCriteriaOverallScores = new CriteriaOverallScores({
    classSubject_id: classSubject._id,
    criteria_overall,
  });

  const criteriaOverallScores = await newCriteriaOverallScores.save();
  console.log('CRITERIA OVERALL SCORES: ', criteriaOverallScores);

  // Generate for the Students Records
  console.log('CLASSSUBJECT DATA: ', classSubject);

  const classData = await Class.find({ _id: classSubject.class_id });
  console.log('CLASS DATA: ', classData);

  // Students records generate
  const studentsRecords = await Promise.all(
    classData[0].student_id.map(async (id) => {
      const newStudentRecords = new StudentRecords({
        student_id: id,
        criteriaOverallScores_id: criteriaOverallScores._id,
        records: criteriaOverallScores.criteria_overall,
      });

      const records = await newStudentRecords.save();
      return records;
    })
  );

  console.log('STUDENT RECORDS: ', studentsRecords);

  await db.disconnect();

  res.status(201).send({ message: 'Subject created successfully' });
};

export default handler;
