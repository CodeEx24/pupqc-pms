import StudentLayout from '@/components/StudentLayout';
// import withStudentAuth from '@/utils/authentication/withStudentAuth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

function HomeScreen() {
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

HomeScreen.auth = {
  role: 'faculty',
};

export default HomeScreen;
