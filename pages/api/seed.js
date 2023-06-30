// import { data } from '@/utils/data';
import Class from '@/models/Class';
import Course from '@/models/Course';
import Criteria from '@/models/Criteria';
import Student from '@/models/Student';
import Subject from '@/models/Subject';
import Teacher from '@/models/Teacher';
import db from '@/utils/db';
import { admins } from '@/utils/data/admins';
import { students } from '@/utils/data/students';
import { teachers } from '@/utils/data/teachers';
import { criteria } from '@/utils/data/criteria';
import { subjects } from '@/utils/data/subjects';
import { course } from '@/utils/data/course';
import { classes } from '@/utils/data/class';
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
  await Student.insertMany(students);
  await Admin.deleteMany();
  await Admin.insertMany(admins);
  await Teacher.deleteMany();
  await Teacher.insertMany(teachers);
  await Criteria.deleteMany();
  await Criteria.insertMany(criteria);
  await Subject.deleteMany();
  await Subject.insertMany(subjects);
  await Course.deleteMany();
  await Course.insertMany(course);
  await Class.deleteMany();
  await Class.insertMany(classes);

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
