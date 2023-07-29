import { useQuery } from '@tanstack/react-query';

import AdminLayout from '../../components/admin/AdminLayout';
import { fetchStudentsPerformance } from '../../components/hooks/Admin/fetch';
import StudentPerformanceList from '../../components/admin/grid/StudentPerformanceList';

function StudentsListScreen() {
  const { data: studentsPerformance, isLoading } = useQuery(
    ['studentsPerformance'],
    fetchStudentsPerformance,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (!isLoading) {
    console.log('studentsPerformance: ', studentsPerformance);
  }

  return (
    <AdminLayout title="Home">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Students Lists</h1>
        <div className="flex items-end gap-3">
          <div className="mb-6 w-full">
            {isLoading ? (
              'Loading...'
            ) : (
              <StudentPerformanceList students={studentsPerformance} />
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

StudentsListScreen.auth = {
  role: 'admin',
};

export default StudentsListScreen;
