import FacultyLayout from '@/components/faculty/FacultyLayout';
// import withStudentAuth from '@/utils/authentication/withStudentAuth';

function SectionSetupScreen() {
  return (
    <FacultyLayout title="Home">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Section Setup</h1>
      </div>
    </FacultyLayout>
  );
}

SectionSetupScreen.auth = {
  role: 'faculty',
};

export default SectionSetupScreen;
