import { useQuery } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import Card from '@/components/Card';
import {
  fetchAllActiveData,
  fetchCourseStudentCount,
  fetchFacultyAchievementCount,
  fetchGradeYearly,
  fetchStudentPassersChart,
} from '../../components/hooks/Admin/fetch';
import StudentCourseCount from '../../components/admin/charts/StudentCourseCount';
import YearlyAveragePerformance from '../../components/admin/charts/YearlyAveragePerformance';
import StudentPassers from '../../components/admin/charts/StudentPassersYearly';
import TeacherAchievement from '../../components/admin/charts/TeacherAchievement';

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

  const studentsPassersQuery = useQuery(
    ['studentPassers'],
    () => fetchStudentPassersChart(),
    {
      refetchOnMount: false, // Avoid refetching on component mount
      refetchOnWindowFocus: false,
    }
  );

  const facultyAchievementQuery = useQuery(
    ['facultyAchievement'],
    () => fetchFacultyAchievementCount(),
    {
      refetchOnMount: false, // Avoid refetching on component mount
      refetchOnWindowFocus: false,
    }
  );

  if (!facultyAchievementQuery.isLoading) {
    console.log('facultyAchievementQuery.data: ', facultyAchievementQuery.data);
  }

  return (
    <AdminLayout title="Home">
      <div className="p-5 rounded-xl">
        <h1 className="text-h4 text-primary mb-5">Home</h1>
        <div className="flex lg:flex-nowrap flex-wrap gap-3 mb-5">
          {allActiveDataQuery.isLoading ? (
            <>
              <Card
                title={'Teacher'}
                value={0}
                words={'Active Teacher'}
                image="bg-adminTeacher"
              />
              <Card
                title={'Class'}
                value={0}
                words={'Active Class'}
                image="bg-adminClasses"
              />
              <Card
                title={'Student'}
                value={0}
                words={'Active Student'}
                image="bg-adminStudent"
              />
            </>
          ) : (
            <>
              <Card
                title={'Teacher'}
                value={allActiveDataQuery.data.data.activeTeacherCount}
                words={'Active Teacher'}
                image="bg-adminTeacher"
              />
              <Card
                title={'Class'}
                value={allActiveDataQuery.data.data.activeClassCount}
                words={'Active Class'}
                image="bg-adminClasses"
              />
              <Card
                title={'Student'}
                value={allActiveDataQuery.data.data.activeStudentCount}
                words={'Active Student'}
                image="bg-adminStudent"
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

          <div className="col-span-12 row-start-1 row-span-4 md:col-span-5 md:row-span-5 rounded-xl p-8 bg-white shadow-md">
            <h3 className="font-semibold text-h6 md:mb-3">Student Passers</h3>
            {studentsPassersQuery.isLoading ? (
              'Loading...'
            ) : (
              <StudentPassers
                studentsPassers={studentsPassersQuery.data.data.result}
                highest={studentsPassersQuery.data.data.highestCount}
                lowest={studentsPassersQuery.data.data.lowestCount}
              />
            )}
          </div>
          <div className="col-span-12 row-span-5  md:col-span-7  rounded-xl p-8 bg-white shadow-md">
            <h3 className="font-semibold text-h6 mb-3">Achievements</h3>
            {facultyAchievementQuery.isLoading ? (
              'Loading...'
            ) : (
              <TeacherAchievement
                teacherAchievement={facultyAchievementQuery.data.data.result}
                highest={facultyAchievementQuery.data.data.highestCount}
                interval={facultyAchievementQuery.data.data.interval}
              />
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
