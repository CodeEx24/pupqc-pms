import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import db from '@/utils/db';
import CriteriaOverallScores from '@/models/CriteriaOverallScores';
import StudentRecords from '@/models/StudentRecords';
import StudentGrade from '@/models/StudentGrade';
import ClassSubject from '@/models/ClassSubject';
import Class from '@/models/Class';
import Course from '@/models/Course';
import Subject from '@/models/Subject';
import Teacher from '@/models/Teacher';
// import Subject from '@/models/Subject';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session.user) {
    return res.status(401).send('Signin required');
  }

  const classSubjectId = req.query.id;

  await db.connect();

  const { _id: criteriaOverallScores_id, criteria_overall } =
    await CriteriaOverallScores.findOne({
      classSubject_id: classSubjectId,
    });

  const { records: student_records } = await StudentRecords.findOne({
    student_id: session.user._id,
    criteriaOverallScores_id: criteriaOverallScores_id,
  });

  const { grade } = await StudentGrade.findOne({
    classSubject_id: classSubjectId,
    student_id: session.user._id,
  });

  const classSubject = await ClassSubject.findOne({ _id: classSubjectId })
    .select('subject_id class_id teacher_id semester')
    .populate('subject_id class_id teacher_id semester');

  const { subject_id, class_id, teacher_id, semester } = classSubject;

  const subject = await Subject.findOne({ _id: subject_id }).select(
    'name description'
  );

  const classes = await Class.findOne({ _id: class_id }).select(
    'year section batch course_id'
  );

  const { course_code } = await Course.findOne({ _id: classes.course_id });

  const { name: teacher_name } = await Teacher.findOne({ _id: teacher_id });

  const details = {
    subject_name: subject.name,
    subject_id: subject._id,
    teacher_name,
    batch: classes.batch,
    semester,
    grade,
    section_code: `${course_code} ${classes.year}-${classes.section}`,
  };

  await db.disconnect();

  res.status(200).json({ criteria_overall, student_records, details });
};

export default handler;
