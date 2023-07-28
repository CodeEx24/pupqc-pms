// /api/admin/subject/code - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import StudentPassers from '@/models/StudentPassers';
import Student from '../../../../../models/Student';

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

  const studentPassers = await StudentPassers.find({});

  // Map each item in studentPassers to add the corresponding student's name
  const studentPassersWithNames = await Promise.all(
    studentPassers.map(async (item) => {
      const student = await Student.findOne({ _id: item.student_id });
      const name = student ? student.name : 'Unknown'; // Set a default name if student not found

      return {
        ...item.toObject(), // Convert Mongoose document to plain object
        name,
      };
    })
  );

  console.log(studentPassersWithNames);

  await db.disconnect();

  res.status(200).json(studentPassersWithNames); // Send the updated data in the response
};

export default handler;
