import StudentLayout from '@/components/student/StudentLayout';
// import withStudentAuth from '@/utils/authentication/withStudentAuth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

function EnrollmentScreen() {
  return (
    <StudentLayout title="Home">
      <div className="text-yellow-500 font-bold text-3xl">
        <Link href="/api/auth/signout">
          <button
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign Out
          </button>
        </Link>
      </div>
    </StudentLayout>
  );
}

EnrollmentScreen.auth = {
  role: 'student',
};

export default EnrollmentScreen;
