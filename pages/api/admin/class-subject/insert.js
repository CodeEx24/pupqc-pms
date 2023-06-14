//  /api/class/insert - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import ClassSubject from '@/models/ClassSubject';
import Criteria from '@/models/Criteria';
import CriteriaOverallScores from '@/models/CriteriaOverallScores';
import StudentRecords from '@/models/StudentRecords';
import StudentClassSubjectGrade from '@/models/StudentClassSubjectGrade';
import Class from '@/models/Class';
import AverageClassGrade from '../../../../models/AverageClassGrade';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  const {
    semesterVal: semester,
    subject_id,
    class_id,
    criteria_id,
    teacher_id,
  } = req.body;

  console.log('SEMESTER:', semester);
  console.log('subject_id:', subject_id);
  console.log('class_id:', class_id);
  console.log('criteria_id:', criteria_id);
  console.log('teacher_id:', teacher_id);

  await db.connect();

  const clsItem = await ClassSubject.findOne({ class_id, semester });
  if (clsItem?.isGradeFinalized) {
    return res
      .status(400)
      .send({ message: 'Subject cannot be added. Grade is already finalized' });
  }

  const isExist = await ClassSubject.findOne({
    semester,
    subject_id,
    class_id,
  });

  if (isExist) {
    await db.disconnect();
    return res.status(409).send({
      message: 'Subject currently exist in the class',
    });
  }

  const newClassSubject = new ClassSubject({
    semester,
    subject_id,
    class_id,
    criteria_id,
    teacher_id,
  });

  // Create a class subject
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

  // Create CRITERIA OVERALL SCORES for class subject
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

      const newStudentClassSubjectGrades = new StudentClassSubjectGrade({
        student_id: id,
        classSubject_id: classSubject._id,
        grade: 5.0,
      });

      await newStudentClassSubjectGrades.save();
      // Generate for STUDENT RECORDS
      const records = await newStudentRecords.save();
      return records;
    })
  );

  console.log('STUDENT RECORDS: ', studentsRecords);

  const newAverageClassGrade = new AverageClassGrade({
    classSubject_id: classSubject._id,
    grade: 5.0,
  });

  await newAverageClassGrade.save();

  // Generate the grades for students once added

  await db.disconnect();

  res.status(201).send({ message: 'Subject created successfully' });
};

export default handler;
