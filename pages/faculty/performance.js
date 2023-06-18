import FacultyLayout from '@/components/faculty/FacultyLayout';
import { useQuery } from '@tanstack/react-query';
import StudentClassList from '@/components/faculty/grid/StudentClassList';
import { fetchStudentsClass } from '@/components/hooks/FacultySubject/fetch';

function PerformanceScreen() {
  const {
    data: studentClass,
    refetch: refetchStudentClass,
    isLoading,
  } = useQuery(['subjectClass'], fetchStudentsClass, {
    refetchOnWindowFocus: false,
  });

  return (
    <FacultyLayout title="Home">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Performance</h1>
        <div className="flex items-end gap-3">
          <div className="mb-6 w-full">
            {isLoading ? (
              'Loading...'
            ) : (
              <StudentClassList
                studentClass={studentClass}
                refetchStudentClass={refetchStudentClass}
              />
            )}
          </div>
        </div>
      </div>
    </FacultyLayout>
  );
}

PerformanceScreen.auth = {
  role: 'faculty',
};

export default PerformanceScreen;
