import FacultyLayout from '@/components/faculty/FacultyLayout';
import Card from '@/components/Card';

import StudentsbyYear from '../../components/faculty/charts/StudentsbyYear';
import { useQuery } from '@tanstack/react-query';
import {
  fetchAverageClassGradeYearly,
  fetchHandleClassAndSubject,
  fetchPassedFailedStudent,
  // fetchPassedFailedStudent,
  fetchStudentsByYearLevel,
} from '../../components/hooks/FacultySubject/fetch';
import AveragePerformance from '../../components/faculty/charts/AveragePerformance';
import PassedFailed from '../../components/faculty/charts/PassedFailed';
import { useMemo } from 'react';

function HomeScreen() {
  const currentDate = useMemo(() => new Date(), []);
  const currentYear = useMemo(() => currentDate.getFullYear(), [currentDate]);
  const currentMonth = useMemo(() => currentDate.getMonth() + 1, [currentDate]);

  const semester = useMemo(() => {
    if (currentMonth >= 10 || (currentMonth >= 1 && currentMonth <= 3)) {
      return 1;
    } else if (currentMonth >= 3 && currentMonth <= 7) {
      return 2;
    } else {
      return 3;
    }
  }, [currentMonth]);

  const classAndSubjectQuery = useQuery(
    ['classAndSubject'],
    () => fetchHandleClassAndSubject(currentYear, semester),
    {
      refetchOnMount: false, // Avoid refetching on component mount
      refetchOnWindowFocus: false,
    }
  );

  // Fetch the student data by year level
  const studentQuery = useQuery(
    ['studentCurrentYearLevelSemester'],
    () => fetchStudentsByYearLevel(currentYear, currentMonth),
    {
      enabled: classAndSubjectQuery.isSuccess,
      refetchOnMount: false, // Avoid refetching on component mount
      refetchOnWindowFocus: false,
    }
  );

  // Fetch the passed/failed student data
  const passedFailedQuery = useQuery(
    ['passedFailedStudentYearly'],
    () => fetchPassedFailedStudent(currentYear),
    {
      enabled: studentQuery.isSuccess, // Enable the query only when the studentQuery has succeeded
      refetchOnMount: false, // Avoid refetching on component mount
      refetchOnWindowFocus: false,
    }
  );

  // Fetch the average class grade data
  const averageClassGradeQuery = useQuery(
    ['averageClassGradeYearly'],
    () => fetchAverageClassGradeYearly(currentYear),
    {
      enabled: passedFailedQuery.isSuccess, // Enable the query only when the passedFailedQuery has succeeded
      refetchOnMount: false, // Avoid refetching on component mount
      refetchOnWindowFocus: false,
    }
  );

  if (
    studentQuery.isLoading ||
    passedFailedQuery.isLoading ||
    averageClassGradeQuery.isLoading ||
    classAndSubjectQuery.isLoading
  ) {
    return null;
  }

  return (
    <FacultyLayout title="Home">
      <div className=" px-5 rounded-xl">
        <h1 className="text-h4 text-primary mb-5">Home</h1>
        <div className="flex lg:flex-nowrap flex-wrap lg:gap-4 md:gap-0 gap-4 justify-between">
          <Card
            title={'Total Class'}
            value={classAndSubjectQuery.data.data.classCount}
            words={'Handled Class'}
            image="bg-class"
            additionalClassName="md:pr-2 lg:pr-0"
          />
          <Card
            title={'Total Subjects'}
            value={classAndSubjectQuery.data.data.subjectCount}
            words={'Handled Subject'}
            image="bg-subject"
            additionalClassName="md:pl-2 lg:pl-0"
          />
          <Card
            title={'Current Semester'}
            value={semester === 1 ? '1st' : semester === 2 ? '2nd' : 'Summer'}
            words={'Semester'}
            image="bg-semester"
            additionalClassName=" md:mt-4 lg:mt-0"
          />
        </div>

        <div className="grid grid-cols-12 grid-rows-12 gap-4 mt-4">
          <div className="col-span-12 row-start-1 row-span-4 md:col-span-5 md:row-span-5 rounded-xl p-8 bg-white shadow-md">
            <h3 className="font-semibold text-h6 md:mb-3">
              Students by Year Level
              <span className="text-gray-600">
                (
                {currentMonth > 9 || (currentMonth >= 1 && currentMonth <= 3)
                  ? '1st Semester'
                  : currentMonth >= 3 && currentMonth <= 7
                  ? '2nd Semester'
                  : 'Summer Term'}
                )
              </span>
            </h3>
            {studentQuery.isLoading ? (
              'Loading...'
            ) : (
              <StudentsbyYear
                studentCurrentYearLevel={studentQuery.data.data.result}
              />
            )}
          </div>
          <div className="col-span-12 row-start-5 row-span-5 md:col-start-6 md:col-span-7 md:row-start-1 rounded-xl p-8 bg-white shadow-md">
            <h3 className="font-semibold text-h6 mb-3">
              Passed/Failed Students
            </h3>

            {passedFailedQuery.isLoading ? (
              'Loading...'
            ) : (
              <PassedFailed
                passed={passedFailedQuery.data.data.passedFailed}
                highest={passedFailedQuery.data.data.highestValue}
                interval={passedFailedQuery.data.data.interval}
              />
            )}
          </div>
          <div className="col-span-12 row-span-5 row-start-11 rounded-xl p-8 bg-white shadow-md">
            <h3 className="font-semibold text-h6 mb-3">
              Average Class Grade per Year
            </h3>
            {averageClassGradeQuery.isLoading ? (
              'Loading...'
            ) : (
              <AveragePerformance
                averagePercentage={
                  averageClassGradeQuery.data.data.averagePercentageColumn
                }
              />
            )}
          </div>
        </div>
      </div>
    </FacultyLayout>
  );
}

HomeScreen.auth = {
  role: 'faculty',
};

export default HomeScreen;
