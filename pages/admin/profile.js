import AdminLayout from '../../components/admin/AdminLayout';

function ProfileScreen() {
  return (
    <AdminLayout title="Profile">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-h4 text-primary">Profile</h1>
      </div>
    </AdminLayout>
  );
}

ProfileScreen.auth = {
  role: 'admin',
};

export default ProfileScreen;
