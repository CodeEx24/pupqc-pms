import { data } from '@/utils/data';
import Class from '@/models/Class';
import Course from '@/models/Course';
import Criteria from '@/models/Criteria';
import Student from '@/models/Student';
import Subject from '@/models/Subject';
import Teacher from '@/models/Teacher';
import db from '@/utils/db';
// import ClassSubject from '@/models/ClassSubject';
import Admin from '@/models/Admin';
import ClassSubject from '@/models/ClassSubject';
import AverageClassGrade from '@/models/AverageClassGrade';
import CriteriaOverallScores from '@/models/CriteriaOverallScores';
import StudentClassSubjectGrade from '@/models/StudentClassSubjectGrade';
import StudentRecords from '@/models/StudentRecords';
import Otp from '@/models/Otp';

const handler = async (req, res) => {
  await db.connect();

  await Student.deleteMany();
  await Student.insertMany(data.students);
  await Admin.deleteMany();
  await Admin.insertMany(data.admins);
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

  await AverageClassGrade.deleteMany();
  await ClassSubject.deleteMany();
  await CriteriaOverallScores.deleteMany();
  await Otp.deleteMany();
  await StudentClassSubjectGrade.deleteMany();
  await StudentRecords.deleteMany();
  // await ClassSubject.insertMany(data.classSubject);

  await db.disconnect();

  res.send({ message: 'seeded successfully' });
};

export default handler;
