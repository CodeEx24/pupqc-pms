import FacultyLayout from '@/components/faculty/FacultyLayout';
// import withStudentAuth from '@/utils/authentication/withStudentAuth';

function StudentsGradeScreen() {
  return (
    <FacultyLayout title="Home">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Students Grade</h1>
      </div>
    </FacultyLayout>
  );
}

StudentsGradeScreen.auth = {
  role: 'faculty',
};

export default StudentsGradeScreen;
