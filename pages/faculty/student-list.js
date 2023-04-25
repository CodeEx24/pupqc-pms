import FacultyLayout from '@/components/faculty/FacultyLayout';
import StudentList from '@/components/faculty/grid/StudentList';
import { useQuery } from '@tanstack/react-query';
import { fetchStudents } from '../../components/hooks/FacultySubject/fetch';
import Loading from '../../components/Loading';

function StudentsListScreen() {
  const { data: students, isLoading } = useQuery(['students'], fetchStudents);

  return (
    <FacultyLayout title="Home">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Students Lists</h1>
        <div className="flex items-end gap-3">
          <div className="mb-6 w-full">
            {isLoading ? 'Loading...' : <StudentList students={students} />}
          </div>
        </div>
      </div>
    </FacultyLayout>
  );
}

StudentsListScreen.auth = {
  role: 'faculty',
};

export default StudentsListScreen;
