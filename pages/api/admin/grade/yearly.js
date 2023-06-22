import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import db from '@/utils/db';
import {
  convertGradeToPercentage,
  getCurrentSemesterData,
} from '../../../../utils/data';
import Class from '../../../../models/Class';
import ClassSubject from '../../../../models/ClassSubject';
import AverageClassGrade from '../../../../models/AverageClassGrade';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).send('Signin required');
  }
  if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
    return res.status(401).send('Unauthorized Access');
  }

  const semesterDetails = getCurrentSemesterData();

  const { currentYear } = semesterDetails;

  await db.connect();

  let years;
  if (semesterDetails.currentMonth >= 6) {
    years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  } else {
    years = Array.from({ length: 5 }, (_, i) => currentYear - i - 1);
  }

  const classData = await Promise.all(
    years.map(async (year) => {
      // Get all classes in the year
      const classes = await Class.find({ batch: year });

      // Fetch classSubjectItem for each class
      const classSubjectPromises = classes.map(async ({ _id: class_id }) => {
        console.log('==================================');
        console.log('YEAR: ', year);
        console.log('class_id: ', class_id);

        const classSubjectItem = await ClassSubject.find({
          class_id,
          isGradeFinalized: true,
        }).select('_id');

        if (classSubjectItem) {
          console.log('classSubjectItem._id: ', classSubjectItem);
        }

        return classSubjectItem.map((item) => item._id.toString()); // Flatten and convert to string
      });

      // Await all classSubjectPromises and return their results
      const classSubjectItems = await Promise.all(classSubjectPromises);

      // Flatten the array and convert to string
      const flattenedClassSubjectItems = classSubjectItems.flat();

      return { year, items: flattenedClassSubjectItems }; // Return an object with the year and its respective items
    })
  );

  // Create the desired result object with respective years as keys
  const desiredResult = Object.fromEntries(
    classData.map(({ year, items }) => [year, items])
  );

  console.log(desiredResult);

  const accumulateGrade = await Promise.all(
    Object.keys(desiredResult).map(async (year) => {
      const averageClassGrades = await Promise.all(
        desiredResult[year].map(async (id) => {
          const averageClassGrade = await AverageClassGrade.findOne({
            classSubject_id: id,
          });
          console.log('averageClassGrade: ', averageClassGrade);

          return averageClassGrade ? averageClassGrade.grade : 0;
        })
      );

      // Accumulate all averageClassGrades and find the average (Accumulate only with the same year).
      const sum = averageClassGrades.reduce(
        (accumulator, grade) => accumulator + grade,
        0
      );
      const grade =
        averageClassGrades.length > 0 ? sum / averageClassGrades.length : 0;

      const average = convertGradeToPercentage(grade);

      return { year, average };
    })
  );

  await db.disconnect();

  return res.status(200).json(accumulateGrade);
}
