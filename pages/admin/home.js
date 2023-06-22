import { useQuery } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import Card from '@/components/Card';
import {
  fetchAllActiveData,
  fetchCourseStudentCount,
  fetchGradeYearly,
} from '../../components/hooks/Admin/fetch';
import StudentCourseCount from '../../components/admin/charts/StudentCourseCount';
import YearlyAveragePerformance from '../../components/admin/charts/YearlyAveragePerformance';

function HomeScreen() {
  const allActiveDataQuery = useQuery(
    ['allActiveCountData'],
    () => fetchAllActiveData(),
    {
      refetchOnMount: false, // Avoid refetching on component mount
      refetchOnWindowFocus: false,
    }
  );

  const courseStudentCountQuery = useQuery(
    ['courseStudentCount'],
    () => fetchCourseStudentCount(),
    {
      refetchOnMount: false, // Avoid refetching on component mount
      refetchOnWindowFocus: false,
    }
  );

  const gradeYearlyQuery = useQuery(['gradeYearly'], () => fetchGradeYearly(), {
    refetchOnMount: false, // Avoid refetching on component mount
    refetchOnWindowFocus: false,
  });

  if (!gradeYearlyQuery.isLoading) {
    console.log('gradeYearlyQuery.data.data: ', gradeYearlyQuery.data.data);
  }

  return (
    <AdminLayout title="Home">
      <div className="p-5 rounded-xl">
        <h1 className="text-h4 text-primary mb-5">Home</h1>
        <div className="flex lg:flex-nowrap flex-wrap gap-3 mb-5">
          {allActiveDataQuery.isLoading ? (
            <>
              <Card title={'activeTeacherCount'} value={25} words={'Wew'} />
              <Card title={'Earnings'} value={25} words={'Wew'} />
              <Card title={'Earnings'} value={25} words={'Wew'} />
            </>
          ) : (
            <>
              <Card
                title={'Teacher'}
                value={allActiveDataQuery.data.data.activeTeacherCount}
                words={'Active Teacher'}
                image="bg-class"
              />
              <Card
                title={'Class'}
                value={allActiveDataQuery.data.data.activeClassCount}
                words={'Active Class'}
                image="bg-class"
              />
              <Card
                title={'Student'}
                value={allActiveDataQuery.data.data.activeStudentCount}
                words={'Active Student'}
                image="bg-class"
              />
            </>
          )}
        </div>
        {/* <div className="flex lg:flex-nowrap flex-wrap gap-3 mb-5">
          <div className="bg-white h-44 rounded-xl w-6/12 p-8 pt-9">HELLO</div>
          <div className="bg-white h-44 rounded-xl w-6/12 p-8 pt-9">HELLO</div>
        </div> */}

        <div className="grid grid-cols-12 grid-rows-12 gap-4 mt-4">
          <div className="col-span-12 row-start-1 row-span-4 md:col-span-5 md:row-span-5 rounded-xl p-8 bg-white shadow-md">
            <h3 className="font-semibold text-h6 md:mb-3">
              Student Per Course
            </h3>
            {courseStudentCountQuery.isLoading ? (
              'Loading...'
            ) : (
              <StudentCourseCount
                courseStudentCount={courseStudentCountQuery.data.data}
              />
            )}
          </div>
          <div className="col-span-12 row-start-5 row-span-5 md:col-start-6 md:col-span-7 md:row-start-1 rounded-xl p-8 bg-white shadow-md">
            <h3 className="font-semibold text-h6 mb-3">School Performance</h3>
            {gradeYearlyQuery.isLoading ? (
              'Loading...'
            ) : (
              <YearlyAveragePerformance average={gradeYearlyQuery.data.data} />
            )}
          </div>
          {/* <div className="col-span-12 row-span-5 row-start-11 rounded-xl p-8 bg-white shadow-md">
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
          </div> */}
        </div>
      </div>
    </AdminLayout>
  );
}

HomeScreen.auth = {
  role: 'admin',
};

export default HomeScreen;
