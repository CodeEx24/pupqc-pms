import AdminLayout from '../../components/admin/AdminLayout';

function HomeScreen() {
  return (
    <AdminLayout title="Home">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-h4 text-primary">Home</h1>
      </div>
    </AdminLayout>
  );
}

HomeScreen.auth = {
  role: 'admin',
};

export default HomeScreen;
