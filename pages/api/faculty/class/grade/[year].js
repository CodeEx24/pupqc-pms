import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import db from '@/utils/db';
import ClassSubject from '@/models/ClassSubject';
import Class from '@/models/Class';
import AverageClassGrade from '@/models/AverageClassGrade';

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
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export default handler;

const convertGradeToPercentage = (grade) => {
  if (grade >= 1.0 && grade <= 1.05) {
    return 100;
  } else if (grade >= 1.06 && grade <= 1.11) {
    return 99;
  } else if (grade >= 1.12 && grade <= 1.17) {
    return 98;
  } else if (grade >= 1.18 && grade <= 1.24) {
    return 97;
  } else if (grade >= 1.25 && grade <= 1.32) {
    return 96;
  } else if (grade >= 1.33 && grade <= 1.4) {
    return 95;
  } else if (grade >= 1.41 && grade <= 1.5) {
    return 94;
  } else if (grade >= 1.51 && grade <= 1.57) {
    return 93;
  } else if (grade >= 1.58 && grade <= 1.65) {
    return 92;
  } else if (grade >= 1.66 && grade <= 1.74) {
    return 91;
  } else if (grade >= 1.75 && grade <= 1.82) {
    return 90;
  } else if (grade >= 1.83 && grade <= 1.9) {
    return 89;
  } else if (grade >= 1.91 && grade <= 1.99) {
    return 88;
  } else if (grade >= 2.0 && grade <= 2.07) {
    return 87;
  } else if (grade >= 2.08 && grade <= 2.15) {
    return 86;
  } else if (grade >= 2.16 && grade <= 2.24) {
    return 85;
  } else if (grade >= 2.25 && grade <= 2.32) {
    return 84;
  } else if (grade >= 2.33 && grade <= 2.4) {
    return 83;
  } else if (grade >= 2.41 && grade <= 2.49) {
    return 82;
  } else if (grade >= 2.5 && grade <= 2.57) {
    return 81;
  } else if (grade >= 2.58 && grade <= 2.65) {
    return 80;
  } else if (grade >= 2.66 && grade <= 2.74) {
    return 79;
  } else if (grade >= 2.75 && grade <= 2.82) {
    return 78;
  } else if (grade >= 2.83 && grade <= 2.9) {
    return 77;
  } else if (grade >= 2.91 && grade <= 3.99) {
    return 76;
  } else if (grade >= 3.0 && grade <= 3.1) {
    return 75;
  } else {
    return 0; // Indicates an invalid grade
  }
};
