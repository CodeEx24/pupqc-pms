// /api/admin/class/year/:year - USER

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import GraduatedStudent from '@/models/GraduatedStudent';

import Student from '@/models/Student';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  const { year } = req.query;

  await db.connect();
  try {
    // Get the current class for the current year
    const graduatedStudents = await GraduatedStudent.find({
      year: year,
    }).select('student_id course_id');

    // Generate their id and names
    const updatedStudents = await Promise.all(
      graduatedStudents.map(async (item) => {
        const student = await Student.findOne({ _id: item.student_id });
        return {
          ...item._doc,
          name: student.name,
        };
      })
    );

    await db.disconnect();
    res.status(200).json(updatedStudents);
  } catch (error) {
    console.error('Error:', error);
    await db.disconnect();
    res.status(500).send('Internal Server Error');
  }

  await db.disconnect();
};

export default handler;
