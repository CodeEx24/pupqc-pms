import { useQuery } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import CriteriaList from '../../components/admin/grid/CriteriaList';
import { fetchCriteria } from '../../components/hooks/Admin/fetch';

function CriteriaScreen() {
  const {
    data: criteriaList,
    isLoading,
    // refetch: refetchTeacherList,
  } = useQuery(['criteriaList'], fetchCriteria);

  return (
    <AdminLayout title="Criteria">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-h4 text-primary">Criteria</h1>
        <div>
          {isLoading ? (
            'Loading...'
          ) : (
            <CriteriaList criteriaList={criteriaList.data} />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

CriteriaScreen.auth = {
  role: 'admin',
};

export default CriteriaScreen;
