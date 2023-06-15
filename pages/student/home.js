import StudentLayout from '@/components/student/StudentLayout';

function HomeScreen() {
  return (
    <StudentLayout title="Home">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-h4 text-primary mb-5">Home</h1>
      </div>
    </StudentLayout>
  );
}

HomeScreen.auth = {
  role: 'student',
};

export default HomeScreen;
