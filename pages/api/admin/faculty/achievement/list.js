// /api/admin/subject/code - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';

import FacultyAchievement from '../../../../../models/FacultyAchievement';
import Teacher from '../../../../../models/Teacher';

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

  const facultyAchievement = await FacultyAchievement.find({});

  // Map each item in studentPassers to add the corresponding student's name
  const facultyAchievementwithNames = await Promise.all(
    facultyAchievement.map(async (item) => {
      console.log(item);
      const teacher = await Teacher.findOne({ _id: item.teacher_id });
      const name = teacher ? teacher.name : 'Unknown'; // Set a default name if student not found

      return {
        ...item.toObject(), // Convert Mongoose document to plain object
        name,
      };
    })
  );

  await db.disconnect();

  res.status(200).json(facultyAchievementwithNames); // Send the updated data in the response
};

export default handler;
