// /api/subject/class - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import ClassSubject from '@/models/ClassSubject';
import Criteria from '@/models/Criteria';
import Class from '@/models/Class';
import Course from '@/models/Course';

// Required results:
// subjectid, className, batch, criteria, semester

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 2 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  await db.connect();

  // Get the classlist
  const classList = await ClassSubject.find({
    teacher_id: session.user._id,
  });

  const classDataRecord = await Promise.all(
    classList.map(async (item) => {
      const criteria = await Criteria.findOne({ _id: item.criteria_id });
      const classes = await Class.findOne({ _id: item.class_id });
      const { course_code } = await Course.findOne({ _id: classes.course_id });
      return {
        classSubject_id: item._id,
        subject_id: item.subject_id,
        class_id: classes._id,
        class_name: course_code + ' ' + classes.year + '-' + classes.section,
        criteria: criteria.name,
        semester:
          item.semester === 1
            ? '1st Semester'
            : item.semester === 2
            ? '2nd Semester'
            : 'Summer',
        batch: classes.batch,
        isGradeFinalized: item.isGradeFinalized,
      };
    })
  );

  // Sort the classDataRecord array in descending order based on the batch
  classDataRecord.sort((a, b) => b.batch - a.batch);

  await db.disconnect();

  res.status(200).json(classDataRecord);
};

export default handler;
