// /api/subject/class - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import ClassSubject from '@/models/ClassSubject';
import CriteriaOverallScores from '@/models/CriteriaOverallScores';
import StudentRecords from '@/models/StudentRecords';
import Criteria from '@/models/Criteria';
import StudentClassSubjectGrade from '@/models/StudentClassSubjectGrade';
import { getGrade } from '@/utils/data';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 2 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  const classSubject_id = req.query.classSubject_id;

  const { item, inputValue: value } = req.body;

  await db.connect();

  const classSubject = await ClassSubject.findOne({ _id: classSubject_id });

  const teacherId = classSubject.teacher_id.toString();
  if (teacherId !== session.user._id) {
    await db.disconnect();
    return res.status(401).send({ message: 'Unauthorized user' });
  }

  if (classSubject.isGradeFinalized) {
    await db.disconnect();
    return res
      .status(401)
      .send({ message: 'The grades have already been finalized.' });
  }

  const itemFormatted = item.toLowerCase().replace(' ', '_');

  const criteriaOverallScores = await CriteriaOverallScores.findOne({
    classSubject_id,
  });

  if (criteriaOverallScores) {
    criteriaOverallScores.criteria_overall = {
      ...criteriaOverallScores.criteria_overall,
      [itemFormatted]: [
        ...criteriaOverallScores.criteria_overall[itemFormatted],
        Number(value),
      ],
    };
  }

  await criteriaOverallScores.save();

  const studentRecordsData = await StudentRecords.find({
    criteriaOverallScores_id: criteriaOverallScores._id,
  });

  const studentRecordsUpdate = studentRecordsData.map((item) => {
    item.records = {
      ...item.records,
      [itemFormatted]: [...item.records[itemFormatted], 0],
    };
    return item;
  });

  for (const record of studentRecordsUpdate) {
    await record.save();

    // Find student classsubjectGrade and recalculate the grades
    const scoresAccumulated = Object.fromEntries(
      Object.keys(record.records).map((item) => {
        const accumulatedRes = record.records[item].reduce(
          (acc, val) => acc + val,
          0
        );
        return [item, accumulatedRes];
      })
    );

    const overallAccumulatedData = Object.entries(
      criteriaOverallScores.criteria_overall
    ).map(([item, values]) => ({
      [item]: values.reduce((acc, val) => acc + val, 0),
    }));

    const overallAccumulated = Object.assign({}, ...overallAccumulatedData);

    const criteriaData = await Criteria.findOne({
      _id: classSubject.criteria_id,
    });

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

    const assessmentGrade = Object.entries(scoresAccumulated).reduce(
      (acc, [key, value]) => {
        const overAllItem = Object.keys(overallAccumulated).find(
          (item) => item === key
        );

        if (overAllItem) {
          if (overallAccumulated[overAllItem] == 0) {
            acc[key] = (
              (1 / 1) *
              criteriaPercentage[overAllItem] *
              100
            ).toFixed(2);
          } else {
            acc[key] = (
              (value / overallAccumulated[overAllItem]) *
              criteriaPercentage[overAllItem] *
              100
            ).toFixed(2);
          }
        }

        return acc;
      },
      {}
    );

    const criteriaFirstLayer = criteriaData.criteria.percentage;

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

    //   Add up all the per
    const resultAdded = Object.keys(groupCriteria).reduce((acc, item) => {
      const total = groupCriteria[item].reduce((sum, assessment) => {
        return sum + parseFloat(assessmentGrade[assessment] || 0);
      }, 0);
      acc[item] = Number((total * criteriaFirstLayer[item]).toFixed(2));
      return acc;
    }, {});

    const percentage = Object.values(resultAdded).reduce(
      (total, current) => total + current,
      0
    );

    const studentGrade = await StudentClassSubjectGrade.findOne({
      classSubject_id: classSubject._id,
      student_id: record.student_id,
    });

    studentGrade.grade = getGrade(percentage);

    await studentGrade.save();
  }

  await db.disconnect();

  res.status(200).json({ message: 'Successfully updated' });
};

export default handler;
