import FacultyLayout from '@/components/faculty/FacultyLayout';
import Card from '@/components/admin/Card';

// import StudentsbyYear from '../../components/faculty/charts/StudentsbyYear';
// import { useQuery } from '@tanstack/react-query';
// import {
//   fetchAverageClassGradeYearly,
//   fetchPassedFailedStudent,
//   // fetchPassedFailedStudent,
//   fetchStudentsByYearLevel,
// } from '../../components/hooks/FacultySubject/fetch';
// import AveragePerformance from '../../components/faculty/charts/AveragePerformance';
// import PassedFailed from '../../components/faculty/charts/PassedFailed';
// import { useMemo } from 'react';

function HomeScreen() {
  // const currentDate = useMemo(() => new Date(), []);
  // const currentYear = useMemo(() => currentDate.getFullYear(), [currentDate]);
  // const currentMonth = useMemo(() => currentDate.getMonth() + 1, [currentDate]);

  // // Fetch the student data by year level
  // const studentQuery = useQuery(
  //   ['studentCurrentYearLevelSemester'],
  //   () => fetchStudentsByYearLevel(currentYear, currentMonth),
  //   {
  //     refetchOnMount: false, // Avoid refetching on component mount
  //     refetchOnWindowFocus: false,
  //   }
  // );

  // // Fetch the passed/failed student data
  // const passedFailedQuery = useQuery(
  //   ['passedFailedStudentYearly'],
  //   () => fetchPassedFailedStudent(currentYear),
  //   {
  //     enabled: studentQuery.isSuccess, // Enable the query only when the studentQuery has succeeded
  //     refetchOnMount: false, // Avoid refetching on component mount
  //     refetchOnWindowFocus: false,
  //   }
  // );

  // // Fetch the average class grade data
  // const averageClassGradeQuery = useQuery(
  //   ['averageClassGradeYearly'],
  //   () => fetchAverageClassGradeYearly(currentYear),
  //   {
  //     enabled: passedFailedQuery.isSuccess, // Enable the query only when the passedFailedQuery has succeeded
  //     refetchOnMount: false, // Avoid refetching on component mount
  //     refetchOnWindowFocus: false,
  //   }
  // );

  // if (
  //   studentQuery.isLoading ||
  //   averageClassGradeQuery.isLoading ||
  //   passedFailedQuery.isLoading
  // ) {
  //   return null;
  // }

  return (
    <FacultyLayout title="Home">
      <div className=" px-10 rounded-xl">
        <h1 className="text-h4 text-primary mb-5">Home</h1>
        <div className="flex lg:flex-nowrap flex-wrap gap-3">
          <Card title={'Earnings'} value={25} words={'Wew'} />
          <Card title={'Earnings'} value={25} words={'Wew'} />
          <Card title={'Earnings'} value={25} words={'Wew'} />
        </div>

        {/* <div className="grid grid-cols-12 grid-rows-12 gap-3 mt-3">
          <div className="col-span-5 row-span-5 row-start-1  rounded-xl p-8 bg-white">
            <h3 className="font-semibold text-h6 mb-3">
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
          <div className="col-span-7 row-span-5 col-start-6 row-start-1  rounded-xl p-8 bg-white">
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
          <div className="col-span-12 row-span-5 row-start-6 rounded-xl p-8 bg-white">
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
        </div>*/}
      </div>
    </FacultyLayout>
  );
}

HomeScreen.auth = {
  role: 'faculty',
};

export default HomeScreen;
