// /api/admin/class/year/:year - USER

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import Class from '@/models/Class';
import Course from '@/models/Course';

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

  // Get the current class for the current year
  const classList = await Class.find({ batch: req.query.year });

  const classListRecord = await Promise.all(
    classList.map(async (cls) => {
      const { course_code } = await Course.findOne({ _id: cls.course_id });
      return {
        name: course_code + ' ' + cls.year + '-' + cls.section,
        id: cls._id,
        batch: cls.batch,
      };
    })
  );

  res.send(classListRecord);
};

export default handler;
