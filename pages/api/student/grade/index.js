import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import db from '@/utils/db';
import Class from '@/models/Class';
import ClassSubject from '@/models/ClassSubject';
import Course from '@/models/Course';
import Subject from '@/models/Subject';
import StudentClassSubjectGrade from '@/models/StudentClassSubjectGrade';
import Teacher from '@/models/Teacher';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 1 || session.user.isAdmin === 2) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }
  const studentID = session.user._id;
  await db.connect();

  const classes = await Class.find({ student_id: studentID }).select(
    'year section course_id batch'
  );

  const modifiedClasses = await Promise.all(
    classes.map(async (item) => {
      const { name: course_name, course_code } = await Course.findOne({
        _id: item.course_id,
      });
      const modifiedItem = { ...item.toObject(), course_name, course_code };
      const classSubjectList = await ClassSubject.find({
        class_id: item._id,
      }).select('semester subject_id teacher_id');

      // Create an array to hold all the modified objects for each semester
      const modifiedSemesterObjects = [];

      // Loop through each semester
      for (let i = 3; i >= 1; i--) {
        const semester = i;
        // Check if there are any subjects for this semester
        const semesterSubjects = classSubjectList.filter(
          (clsSubject) => clsSubject.semester === semester
        );
        if (semesterSubjects.length !== 0) {
          const modifiedSubjects = await Promise.all(
            semesterSubjects.map(async (clsSubject) => {
              const { name: subject_name, _id: subject_id } =
                await Subject.findOne({
                  _id: clsSubject.subject_id,
                });

              const { name: teacher_name } = await Teacher.findOne({
                _id: clsSubject.teacher_id,
              });

              const { grade } = await StudentClassSubjectGrade.findOne({
                classSubject_id: clsSubject._id,
                student_id: studentID,
              });
              return {
                subject_name,
                subject_id,
                classSubject_id: clsSubject._id,
                grade,
                teacher_name,
              };
            })
          );

          const modifiedSemesterObject = {
            ...modifiedItem,
            semester,
            subjects: modifiedSubjects,
          };

          modifiedSemesterObjects.push(modifiedSemesterObject);
        }
      }

      // If there are no subjects for any semester, create a default object
      if (modifiedSemesterObjects.length === 0) {
        const defaultObject = {
          ...modifiedItem,
          subjects: [],
          semester: 1,
        };
        modifiedSemesterObjects.push(defaultObject);
      }

      return modifiedSemesterObjects;
    })
  ); // Use flat() to flatten the array of semester objects into a single array

  res.json(modifiedClasses);
};

export default handler;
