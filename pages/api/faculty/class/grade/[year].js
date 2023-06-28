import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import db from '@/utils/db';
import ClassSubject from '@/models/ClassSubject';
import Class from '@/models/Class';
import AverageClassGrade from '@/models/AverageClassGrade';
import { convertGradeToPercentage } from '@/utils/data';

const getClassBatch = async (years) => {
  const classBatch = await Promise.all(
    years.map(async (year) => {
      const classBatchItem = await Class.find({ batch: year }).select('batch');
      return [year, ...classBatchItem.map((item) => item._id.toString())];
    })
  );

  return classBatch.reduce((acc, item) => {
    acc[item[0]] = item.slice(1);
    return acc;
  }, {});
};

const calculateAveragePercentage = async (teacher_id, classIds) => {
  let grade = 0;
  let length = 0;

  for (const classId of classIds) {
    const classSubjectList = await ClassSubject.find({
      teacher_id,
      class_id: classId,
      isGradeFinalized: true,
    });

    if (classSubjectList.length === 0) {
      continue;
    }

    for (const clsSubjectItem of classSubjectList) {
      const averageClassSubjectGrade = await AverageClassGrade.findOne({
        classSubject_id: clsSubjectItem._id,
      }).select('grade');

      grade += averageClassSubjectGrade.grade;
      length += 1;
    }
  }

  const gradeAve = length > 0 ? grade / length : 0;
  const averagePercentage = await convertGradeToPercentage(gradeAve.toFixed(2));

  return averagePercentage;
};

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 2 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  const teacher_id = session.user._id;
  const years = Array.from({ length: 10 }, (_, i) => req.query.year - i - 1);

  try {
    await db.connect();
    const transformedClassBatch = await getClassBatch(years);

    const columnData = [];

    for (const [year, classIds] of Object.entries(transformedClassBatch)) {
      const averagePercentage = await calculateAveragePercentage(
        teacher_id,
        classIds
      );

      columnData.push({ year, averagePercentage });
    }

    await db.disconnect();

    res.status(200).json({
      averagePercentageColumn: columnData,
    });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

export default handler;
