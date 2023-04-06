import FacultyLayout from '@/components/FacultyLayout';
// import withStudentAuth from '@/utils/authentication/withStudentAuth';

function AttendanceScreen() {
  return (
    <FacultyLayout title="Home">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Attendance</h1>
      </div>
    </FacultyLayout>
  );
}

AttendanceScreen.auth = {
  role: 'faculty',
};

export default AttendanceScreen;
