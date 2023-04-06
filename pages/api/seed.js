import Student from '@/models/Student';
import Teacher from '@/models/Teacher';
import { data } from '@/utils/data';
import db from '@/utils/db';

const handler = async (req, res) => {
  await db.connect();
  await Student.deleteMany();
  await Student.insertMany(data.students);
  await Teacher.deleteMany();
  await Teacher.insertMany(data.teachers);
  await db.disconnect();

  res.send({ message: 'seeded successfully' });
};

export default handler;
