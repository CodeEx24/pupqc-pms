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

  const classSubjectData = await Promise.all(
    classes.map(async (classItem) => {
      const { course_code } = await Course.findOne({
        _id: classItem.course_id,
      }).lean();
      const clsSubject = await ClassSubject.find({ class_id: classItem._id })
        .select('semester isGradeFinalized')
        .lean();

      const clsSubjectData = clsSubject.map((classSubjectItem) => {
        return {
          ...classSubjectItem,
          // course_code,
          class_id: classItem._id,
          batch: classItem.batch,
          class_name:
            course_code + ' ' + classItem.year + '-' + classItem.section,
          // semester: item.semester,
          // isGradeFinalized: item.isGradeFinalized,
        };
      });
      return clsSubjectData;
    })
  );

  let seenData = new Set();
  let filteredData = [];

  for (let sublist of classSubjectData) {
    let filteredSublist = [];
    for (let data of sublist) {
      let key = `${data.semester}_${data.class_name}_${data.batch}`;
      if (!seenData.has(key)) {
        seenData.add(key);
        filteredSublist.push(data);
      }
    }
    filteredData.push(filteredSublist);
  }

  let flattenedData = filteredData.flat();

  await db.disconnect();

  return res.status(200).json(flattenedData);
}
