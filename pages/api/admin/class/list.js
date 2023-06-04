import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import db from '@/utils/db';
import Class from '../../../../models/Class';
import ClassSubject from '../../../../models/ClassSubject';
import Course from '../../../../models/Course';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send('Signin required');
  if (session.user.isAdmin === 1 || session.user.isAdmin === 0)
    return res.status(401).send('Unauthorized Access');

  await db.connect();
  const classes = await Class.find({}, 'year section batch course_id').lean();
  // console.log('CLASSES:', classes);

  const classSubjectData = await Promise.all(
    classes.map(async (item) => {
      const { course_code } = await Course.findOne({ _id: item.course_id })
        .select('course_code')
        .lean();
      const clsSubject = await ClassSubject.findOne({ class_id: item._id })
        .select('semester isGradeFinalized')
        .lean();
      // console.log('clsSubhec: ', clsSubject);
      return clsSubject
        ? {
            ...item,
            course_code,
            semester: clsSubject.semester,
            isGradeFinalized: clsSubject.isGradeFinalized,
          }
        : { _id: null };
    })
  );

  const filteredClsSubject = classSubjectData.filter(
    (item) => item._id !== null
  );
  console.log('FILTERED: ', filteredClsSubject);

  const fixedClass = filteredClsSubject.map((item) => {
    console.log(item);
    return {
      class_id: item._id,
      course_id: item.course_id,
      class: `${item.course_code} ${item.year}-${item.section}`,
      batch: item.batch,
      semester: item.semester,
      isGradeFinalized: item.isGradeFinalized,
    };
  });

  await db.disconnect();

  return res.status(200).json(fixedClass);
}
