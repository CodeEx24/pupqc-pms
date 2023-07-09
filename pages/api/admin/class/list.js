import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import db from '@/utils/db';
import Class from '../../../../models/Class';
import ClassSubject from '../../../../models/ClassSubject';
import Course from '../../../../models/Course';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  await db.connect();
  const classes = await Class.find({}, 'year section batch course_id').lean();

  const classSubjectData = await Promise.all(
    classes.map(async (classItem) => {
      const { course_code } = await Course.findOne({
        _id: classItem.course_id,
      }).lean();
      const clsSubject = await ClassSubject.find({ class_id: classItem._id })
        .select('semester isGradeFinalized')
        .lean();

      const clsSubjectData = clsSubject.map((classSubjectItem) => {
        return {
          ...classSubjectItem,
          // course_code,
          class_id: classItem._id,
          batch: classItem.batch,
          class_name:
            course_code + ' ' + classItem.year + '-' + classItem.section,
          // semester: item.semester,
          // isGradeFinalized: item.isGradeFinalized,
        };
      });
      return clsSubjectData;
    })
  );

  let seenData = new Set();
  let filteredData = [];

  for (let sublist of classSubjectData) {
    let filteredSublist = [];
    for (let data of sublist) {
      let key = `${data.semester}_${data.class_name}_${data.batch}`;
      if (!seenData.has(key)) {
        seenData.add(key);
        filteredSublist.push(data);
      }
    }
    filteredData.push(filteredSublist);
  }

  let flattenedData = filteredData.flat();

  // if year is current year and semester is equal to previous
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const semester =
    currentMonth >= 10 || (currentMonth >= 1 && currentMonth <= 3)
      ? 1
      : currentMonth >= 3 && currentMonth <= 7
      ? 2
      : 3;

  const newClassData = flattenedData.map((clsItem) => {
    const previousSemester = semester === 1 ? 3 : semester - 1; // Calculate previous semester
    let isRevokable = false;

    if (semester === 1) {
      if (
        (clsItem.semester === semester &&
          clsItem.batch === String(currentYear)) ||
        (clsItem.semester === previousSemester &&
          clsItem.batch === String(currentYear - 1))
      ) {
        isRevokable = true;
      } else {
        isRevokable = false;
      }
    } else if (semester === 2 || semester === 3) {
      if (
        (clsItem.semester === semester &&
          clsItem.batch === String(currentYear)) ||
        (clsItem.semester === previousSemester &&
          clsItem.batch === String(currentYear))
      ) {
        isRevokable = true;
      } else {
        isRevokable = false;
      }
    }

    return {
      ...clsItem,
      isRevokable,
    };
  });

  // if semester is 3 allow itself and 2
  // if semester is 2 allow itself and 1
  // if semester is 1 allow the 3

  // Assume that the year is January and semester is 1
  // const semester = useMemo(() => {
  //   if (currentMonth >= 10 || (currentMonth >= 1 && currentMonth <= 3)) {
  //     return 1; // semester 1
  //   } else if (currentMonth >= 3 && currentMonth <= 7) {
  //     return 2; // semester 2
  //   } else {
  //     return 3; // semestrer 3
  //   }
  // }, [currentMonth]);

  await db.disconnect();

  return res.status(200).json(newClassData);
}
