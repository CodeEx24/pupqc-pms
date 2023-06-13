import FacultyLayout from '@/components/faculty/FacultyLayout';

// import withStudentAuth from '@/utils/authentication/withStudentAuth';
// import Select from 'react-select';
import PassingRate from '@/components/faculty/charts/PassingRate';
import StudentsbyYear from '../../components/faculty/charts/StudentsbyYear';
import { useQuery } from '@tanstack/react-query';
import { fetchStudentsByYearLevel } from '../../components/hooks/FacultySubject/fetch';
import Card from '@/components/admin/Card';

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

  // const semesterOption = [
  //   { value: 1, label: '1st Semester' },
  //   { value: 2, label: '2nd Semester' },
  //   { value: 3, label: 'Summer Term' },
  // ];

  // const handleInputChange = (id) => {
  //   if (id === 'year') {
  //     console.log('YEAR', id);
  //   } else {
  //     console.log('CLASS YEAR LEVEL: ', id);
  //   }
  // };

  return (
    <FacultyLayout title="Home">
      <div className=" px-10 rounded-xl">
        <h1 className="text-h4 text-primary mb-5">Home</h1>
        <div className="flex lg:flex-nowrap flex-wrap gap-3 ">
          <Card title={'Earnings'} value={25} words={'Wew'} />
          <Card title={'Earnings'} value={25} words={'Wew'} />
          <Card title={'Earnings'} value={25} words={'Wew'} />
        </div>

        <div className="grid grid-cols-12 grid-rows-12 gap-3">
          {/* <div className="col-span-3 row-span-2 border rounded-md  flex flex-col p-5">
            <label className="font-semibold text-gray-800">Year</label>
            <Select
              // value={selectedSemester}
              // options={semesterOption}
              isClearable
              placeholder="Year"
              id="year"
              // {...register('semester', { required: true })}
              // onChange={() => handleInputChange('year')}
              className="mb-3 w-full "
              // styles={selectStyles('semester')}
            />
          </div>
          <div className="col-span-3 row-span-2 col-start-4 border rounded-md  flex flex-col p-5">
            <label className="font-semibold text-gray-800">
              Class Year Level
            </label>
            <Select
              // value={selectedSemester}
              // options={semesterOption}
              isClearable
              placeholder="Year Level"
              id="classYearLeveler"
              // {...register('semester', { required: true })}
              // onChange={() => handleInputChange('classYearLeveler')}
              className="mb-3 w-full "
              // styles={selectStyles('semester')}
            />
          </div>
          <div className="col-span-3 row-span-2 col-start-7 border rounded-md  p-5 flex gap-3 ">
            <div className="my-auto">IMAGE HERE</div>
            <div className="my-auto">
              <h3 className="font-semibold">Subject Handled</h3>
              <p className="text-3xl">3,000 Students</p>
            </div>
          </div> */}
          {/* <div className="col-span-3 row-span-1 col-start-10  rounded-md ">
            5
          </div> */}
          <div className="col-span-5 row-span-5 row-start-3  rounded-xl p-8 bg-white">
            <h3 className="font-semibold ">
              Students by Year Level{' '}
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
          <div className="col-span-7 row-span-5 col-start-6 row-start-3  rounded-md p-5 bg-white">
            <h3 className="font-semibold ">Passing Rate (Previous Years)</h3>
            <PassingRate />
          </div>
          <div className="col-span-12 row-span-5 row-start-8  rounded-xl bg-white ">
            SUP IM CHART
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
