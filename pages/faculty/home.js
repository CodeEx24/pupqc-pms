import FacultyLayout from '@/components/faculty/FacultyLayout';

// import withStudentAuth from '@/utils/authentication/withStudentAuth';
// import Select from 'react-select';
import StudentsbyYear from '../../components/faculty/charts/StudentsbyYear';
import { useQuery } from '@tanstack/react-query';
import {
  fetchPassedFailedStudent,
  fetchStudentsByYearLevel,
} from '../../components/hooks/FacultySubject/fetch';
import Card from '@/components/admin/Card';
import AveragePerformance from '../../components/faculty/charts/AveragePerformance';
import PassedFailed from '../../components/faculty/charts/PassedFailed';

function HomeScreen() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 to get the month in the range of 1-12
  console.log(currentYear); // Output: e.g., 2023
  console.log(currentMonth); // Output: e.g., 5

  const {
    data: studentCurrentYearLevel,
    isLoading: isLoadingStudentData,
    // refetch: refetchStudentData,
  } = useQuery(
    ['studentCurrentYearLevelSemester'],
    () => fetchStudentsByYearLevel(currentYear, currentMonth),
    {
      refetchOnWindowFocus: false,
    }
  );

  const {
    data: passedFailedStudent,
    isLoading: isLoadingPassedFailedStudent,
    // refetch: refetchStudentData,
  } = useQuery(
    ['passedFailedStudent'],
    () => fetchPassedFailedStudent(currentYear),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <FacultyLayout title="Home">
      <div className=" px-10 rounded-xl">
        <h1 className="text-h4 text-primary mb-5">Home</h1>
        <div className="flex lg:flex-nowrap flex-wrap gap-3">
          <Card title={'Earnings'} value={25} words={'Wew'} />
          <Card title={'Earnings'} value={25} words={'Wew'} />
          <Card title={'Earnings'} value={25} words={'Wew'} />
        </div>

        <div className="grid grid-cols-12 grid-rows-12 gap-3 mt-3">
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
            {isLoadingStudentData ? (
              'Loading...'
            ) : (
              <StudentsbyYear
                studentCurrentYearLevel={studentCurrentYearLevel.data.result}
              />
            )}
          </div>
          <div className="col-span-7 row-span-5 col-start-6 row-start-1  rounded-xl p-8 bg-white">
            <h3 className="font-semibold text-h6 mb-3">
              Passed/Failed Students
            </h3>
            <PassedFailed />
          </div>
          <div className="col-span-12 row-span-5 row-start-6 rounded-xl p-8 bg-white">
            <h3 className="font-semibold text-h6 mb-3">
              Average Class Grade per Year
            </h3>
            <AveragePerformance />
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
