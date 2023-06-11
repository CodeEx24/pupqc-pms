import { useQuery } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import ClassList from '../../components/admin/grid/ClassList';
import { fetchAllClass } from '../../components/hooks/Admin/fetch';

function CurrentClassScreen() {
  const {
    data: classList,
    isLoading,
    refetch: refetchClassList,
  } = useQuery(['all-class'], fetchAllClass, {
    // refetchInterval: false,
    // refetchIntervalInBackground: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <AdminLayout title="Classes">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-h4 text-primary mb-5">Classes</h1>
        <div>
          {isLoading ? (
            'Loading...'
          ) : (
            <ClassList
              classList={classList.data}
              refetchClassList={refetchClassList}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

CurrentClassScreen.auth = {
  role: 'admin',
};

export default CurrentClassScreen;
