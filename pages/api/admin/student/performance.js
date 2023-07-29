import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';

import GraduatedStudent from '../../../../models/GraduatedStudent';
import Student from '../../../../models/Student';

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

  const currentYear = new Date().getFullYear();
  const previousYears = [
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
    currentYear - 4,
  ];
  const yearsToQuery = [...previousYears, currentYear];

  const graduatedStudent = await GraduatedStudent.find({
    year: { $in: yearsToQuery },
  });

  console.log('graduatedStudent: ', graduatedStudent);

  const studentData = await Promise.all(
    graduatedStudent.map(async (data) => {
      const studentData = await Student.findOne({
        _id: data.student_id,
      }).select('name email profileImageUrl mobileNo');
      return studentData;
    })
  );

  await db.disconnect();

  res.json({ studentData });
};

export default handler;
