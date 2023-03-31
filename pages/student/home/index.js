// import { usePageProtection } from '@/components/hooks/usePageProtection';
import withStudentAuth from '@/utils/authentication/withStudentAuth';
// import Home from '@/pages';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
// import { useRouter } from 'next/router';

function HomeScreen() {
  return (
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
  );
}

export default withStudentAuth(HomeScreen);
