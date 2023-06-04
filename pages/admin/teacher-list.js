import { useQuery } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import TeacherList from '../../components/admin/grid/TeacherList';
import { fetchTeacherList } from '../../components/hooks/Admin/fetch';

function TeacherListScreen() {
  // Get user info
  const {
    data: teacherList,
    isLoading,
    // refetch: refetchTeacherList,
  } = useQuery(['teachers'], fetchTeacherList);

  if (teacherList) {
    console.log(teacherList.data);
  }

  return (
    <AdminLayout title="Teacher List">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-h4 text-primary mb-5">Teacher List</h1>
        <div>
          {isLoading ? (
            'Loading...'
          ) : (
            <TeacherList teacherList={teacherList.data} />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

TeacherListScreen.auth = {
  role: 'admin',
};

export default TeacherListScreen;
