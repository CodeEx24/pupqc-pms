import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import CriteriaOverallScores from '@/models/CriteriaOverallScores';
import StudentRecords from '@/models/StudentRecords';
import ClassSubject from '@/models/ClassSubject';
import Criteria from '@/models/Criteria';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session.user.isAdmin) {
    return res.status(401).send('Signin required');
  }

  const { studentId, classSubjectId } = req.query;

  const { assessment, values } = req.body;

  await db.connect();

  const criteriaOverallData = await CriteriaOverallScores.findOne({
    classSubject_id: classSubjectId,
  });

  const studentRecord = await StudentRecords.findOne({
    criteriaOverallScores_id: criteriaOverallData,
    student_id: studentId,
  });

  if (!studentRecord) {
    return res.status(404).json({ message: 'Student record not found' });
  }

  studentRecord.records = {
    ...studentRecord.records,
    [assessment]: values,
  };

  await studentRecord.save();

  const scoresAccumulated = Object.fromEntries(
    Object.keys(studentRecord.records).map((item) => {
      const accumulatedRes = studentRecord.records[item].reduce(
        (acc, val) => acc + val,
        0
      );
      return [item, accumulatedRes];
    })
  );

  console.log('SCORES ACCUMULATED: ', scoresAccumulated);

  const overallAccumulatedData = Object.entries(
    criteriaOverallData.criteria_overall
  ).map(([item, values]) => ({
    [item]: values.reduce((acc, val) => acc + val, 0),
  }));

  const overallAccumulated = Object.assign({}, ...overallAccumulatedData);

  console.log('OVERALL ACCUMULATED', overallAccumulated);

  // With those accumulated I want to know the percentage of it in the criteria table

  const classSubjectData = await ClassSubject.findOne({
    _id: classSubjectId,
  }).select('criteria_id');

  const criteriaData = await Criteria.findOne({
    _id: classSubjectData.criteria_id,
  });

  //   console.log('CRITERIA DATA: ', criteriaData);

  // Get the percentage in the
  const criteriaPercentageData = Object.keys(
    criteriaData.criteria.percentage
  ).map((item) => {
    const percentage = Object.keys(criteriaData.criteria[item]).map(
      (itemAssessment) => {
        return {
          [itemAssessment]:
            criteriaData.criteria[item][itemAssessment].weightage,
        };
      }
    );

    return percentage;
  });

  const flatCriteriaPercentageData = criteriaPercentageData.flat();
  const criteriaPercentage = flatCriteriaPercentageData.reduce(
    (acc, obj) => ({ ...acc, ...obj }),
    {}
  );

  console.log('RESULT: ', criteriaPercentage);

  const assessmentGrade = Object.entries(scoresAccumulated).reduce(
    (acc, [key, value]) => {
      const overAllItem = Object.keys(overallAccumulated).find(
        (item) => item === key
      );
      if (overAllItem) {
        acc[key] = (
          (value / overallAccumulated[overAllItem]) *
          criteriaPercentage[overAllItem] *
          100
        ).toFixed(2);
      }
      return acc;
    },
    {}
  );

  console.log('ASSESSMENT GRADE: ', assessmentGrade);

  const criteriaFirstLayer = criteriaData.criteria.percentage;

  console.log(criteriaFirstLayer);

  const groupCriteria = Object.keys(criteriaFirstLayer)
    .reduce((acc, item) => {
      const assessments = Object.keys(criteriaData.criteria[item]).map(
        (assessmentItem) => ({ [item]: assessmentItem })
      );
      return [...acc, ...assessments];
    }, [])
    .reduce((acc, curr) => {
      const key = Object.keys(curr)[0];
      const value = curr[key];
      acc[key] = acc[key] ? [...acc[key], value] : [value];
      return acc;
    }, {});

  console.log(groupCriteria);

  //   Add up all the per
  const resultAdded = Object.keys(groupCriteria).reduce((acc, item) => {
    const total = groupCriteria[item].reduce((sum, assessment) => {
      return sum + parseFloat(assessmentGrade[assessment] || 0);
    }, 0);
    acc[item] = Number((total * criteriaFirstLayer[item]).toFixed(2));
    return acc;
  }, {});

  console.log('Result Added: ', resultAdded);

  await db.disconnect();

  res.json({ message: 'Student scores updated successfully' });
};

export default handler;
