import AdminLayout from '../../components/admin/AdminLayout';

function SubjectScreen() {
  return (
    <AdminLayout title="Subject">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-h4 text-primary">Subject</h1>
      </div>
    </AdminLayout>
  );
}

SubjectScreen.auth = {
  role: 'admin',
};

export default SubjectScreen;
