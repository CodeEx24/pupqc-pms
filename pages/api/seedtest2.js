// import { data } from '@/utils/data';
import db from '@/utils/db';
import Teacher from '@/models/Teacher';
import { teachers } from '@/utils/data/teachers';

const handler = async (req, res) => {
  await db.connect();

  await Teacher.deleteMany();
  await Teacher.insertMany(teachers);

  await db.disconnect();

  res.send({ message: '2nd set seeded successfully' });
};

export default handler;
