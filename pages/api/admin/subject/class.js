// /api/subject/class - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import ClassSubject from '@/models/ClassSubject';
import Criteria from '@/models/Criteria';
import Class from '@/models/Class';
import Course from '@/models/Course';
import Teacher from '../../../../models/Teacher';

// Required results:
// subjectid, className, batch, criteria, semester

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  await db.connect();

  // Get the classlist
  const classSubjectList = await ClassSubject.find({});

  const classDataRecord = await Promise.all(
    classSubjectList.map(async (item) => {
      const criteria = await Criteria.findOne({ _id: item.criteria_id });
      const classes = await Class.findOne({ _id: item.class_id });
      const teacher = await Teacher.findOne({ _id: item.teacher_id }).select(
        'name'
      );
      const { course_code } = await Course.findOne({ _id: classes.course_id });
      return {
        teacher: teacher.name,
        classSubject_id: item._id,
        isGradeFinalized: item.isGradeFinalized,
        subject_id: item.subject_id,
        class_id: classes._id,
        class_name: course_code + ' ' + classes.year + '-' + classes.section,
        criteria: criteria.name,
        semester:
          item.semester === 1
            ? '1st Semester'
            : item.semester === 2
            ? '2nd Semester'
            : 'Summer Term',
        batch: classes.batch,
      };
    })
  );

  //   const subjects = await Subject.find();

  await db.disconnect();

  await classDataRecord.sort((a, b) =>
    b.classSubject_id.toString().localeCompare(a.classSubject_id.toString())
  );

  const classNameList = [
    ...new Set(classDataRecord.map((item) => item.class_name)),
  ];

  res.status(200).json({ classDataRecord, classNameList });
};

export default handler;
