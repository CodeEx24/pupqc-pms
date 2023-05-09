import FacultyLayout from '@/components/faculty/FacultyLayout';
import { useQuery } from '@tanstack/react-query';
import StudentClassList from '../../../components/faculty/grid/StudentClassList';
import { fetchStudentsClass } from '../../../components/hooks/FacultySubject/fetch';
// import withStudentAuth from '@/utils/authentication/withStudentAuth';

function PerformanceScreen() {
  // Student, subject, batch, semester

  const {
    data: studentClass,
    // refetch: refetchSubjectClass,
    isLoading,
  } = useQuery(['subjectClass'], fetchStudentsClass, {
    refetchOnWindowFocus: false,
  });

  console.log(studentClass);

  // Student ID, Profile, Name, Subject ID, Batch, Semester, Button for managing students grade

  // Pages for student in which the teacher can be able to save

  return (
    <FacultyLayout title="Home">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Performance</h1>
        <div className="flex items-end gap-3">
          <div className="mb-6 w-full">
            {isLoading ? (
              'Loading...'
            ) : (
              <StudentClassList studentClass={studentClass} />
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
