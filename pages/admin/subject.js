import { useQuery } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import SubjectList from '../../components/admin/grid/SubjectList';
import { fetchSubjectList } from '../../components/hooks/Admin/fetch';

function SubjectScreen() {
  const {
    data: subjectList,
    isLoading,
    // refetch: refetchTeacherList,
  } = useQuery(['subjectList'], fetchSubjectList);

  return (
    <AdminLayout title="Subject">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-h4 text-primary">Subject</h1>
        <div>
          {isLoading ? (
            'Loading...'
          ) : (
            <SubjectList subjectList={subjectList.data} />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

SubjectScreen.auth = {
  role: 'admin',
};

export default SubjectScreen;
