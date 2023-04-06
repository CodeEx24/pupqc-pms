import FacultyLayout from '@/components/FacultyLayout';
// import withStudentAuth from '@/utils/authentication/withStudentAuth';

function CriteriaScreen() {
  return (
    <FacultyLayout title="Home">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Criteria</h1>
      </div>
    </FacultyLayout>
  );
}

CriteriaScreen.auth = {
  role: 'faculty',
};

export default CriteriaScreen;
