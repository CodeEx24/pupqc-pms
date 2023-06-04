import { useQuery } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import ClassList from '../../components/admin/grid/ClassList';
import { fetchAllClass } from '../../components/hooks/Admin/fetch';

function CurrentClassScreen() {
  const { data: classList, isLoading } = useQuery(['all-class'], fetchAllClass);

  return (
    <AdminLayout title="Current Class">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-h4 text-primary">Current Class</h1>
        <div>
          {isLoading ? 'Loading...' : <ClassList classList={classList.data} />}
        </div>
      </div>
    </AdminLayout>
  );
}

CurrentClassScreen.auth = {
  role: 'admin',
};

export default CurrentClassScreen;
