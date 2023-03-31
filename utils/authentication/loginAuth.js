import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function loginAuth(Component) {
  function AuthWrapper(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
      return <Loading />;
    }

    if (session) {
      if (session.user.isAdmin) {
        router.push('/faculty/home');
      } else router.push('/student/home');

      return null;
    }

    return <Component {...props} />;
  }

  return AuthWrapper;
}

export default loginAuth;
