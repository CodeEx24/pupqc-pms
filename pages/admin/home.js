import { useQuery } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import Card from '../../components/admin/card';
import TeacherList from '../../components/admin/grid/TeacherList';
import { fetchTeacherList } from '../../components/hooks/Admin/fetch';

function HomeScreen() {
  const {
    data: teacherList,
    isLoading,
    // refetch: refetchTeacherList,
  } = useQuery(['teachers'], fetchTeacherList);

  return (
    <AdminLayout title="Home">
      <div className="p-5 rounded-xl">
        <h1 className="text-h4 text-primary mb-5">Home</h1>
        <div className="flex lg:flex-nowrap flex-wrap gap-3 mb-5">
          <Card title={'Earnings'} value={25} words={'Wew'} />
          <Card title={'Earnings'} value={25} words={'Wew'} />
          <Card title={'Earnings'} value={25} words={'Wew'} />
        </div>
        {/* <div className="flex lg:flex-nowrap flex-wrap gap-3 mb-5">
          <div className="bg-white h-44 rounded-xl w-6/12 p-8 pt-9">HELLO</div>
          <div className="bg-white h-44 rounded-xl w-6/12 p-8 pt-9">HELLO</div>
        </div> */}

        <div className="flex lg:flex-nowrap flex-wrap gap-3 bg-white  rounded-xl">
          <div className=" w-full p-3">
            {isLoading ? (
              'Loading...'
            ) : (
              <TeacherList teacherList={teacherList.data} />
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

HomeScreen.auth = {
  role: 'admin',
};

export default HomeScreen;
