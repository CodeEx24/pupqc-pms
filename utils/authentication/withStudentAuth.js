import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function withStudentAuth(Component) {
  function AuthWrapper(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
      return <Loading />;
    }

    if (status === 'unauthenticated') {
      router.push('/');
      return null;
    }

    if (session.user.isAdmin) {
      router.push('/student/home');
      return null;
    }

    return <Component {...props} />;
  }

  return AuthWrapper;
}

export default withStudentAuth;
