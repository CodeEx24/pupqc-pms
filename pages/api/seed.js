import Class from '@/models/Class';
import Course from '@/models/Course';
import Criteria from '@/models/Criteria';
import Student from '@/models/Student';
import Subject from '@/models/Subject';
import Teacher from '@/models/Teacher';
import { data } from '@/utils/data';
import db from '@/utils/db';

const handler = async (req, res) => {
  await db.connect();

  await Student.deleteMany();
  await Student.insertMany(data.students);
  await Teacher.deleteMany();
  await Teacher.insertMany(data.teachers);
  await Criteria.deleteMany();
  await Criteria.insertMany(data.criteria);
  await Subject.deleteMany();
  await Subject.insertMany(data.subject);
  await Course.deleteMany();
  await Course.insertMany(data.course);
  await Class.deleteMany();
  await Class.insertMany(data.class);

  await db.disconnect();

  res.send({ message: 'seeded successfully' });
};

export default handler;
