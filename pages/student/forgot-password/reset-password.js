import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/components/DefaultLayout';
import OtpComponent from '@/components/password/Otp';

import Loading from '@/components/Loading';
import { useRouter } from 'next/router';
import ResetPassword from '@/components/password/ResetPassword';

function OtpScreen() {
  const router = useRouter();
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isActiveEmail, setIsActiveEmail] = useState(false);

  const email =
    typeof window !== 'undefined' &&
    sessionStorage.getItem('forgotPasswordEmail');

  useEffect(() => {
    if (!email) {
      router.push('/faculty/forgot-password');
      return;
    } else {
      setIsActiveEmail(true);
    }
  }, [router, email]);

  return (
    <DefaultLayout title="Student Portal">
      {/* If the otp is verified with the email */}
      {!isOtpVerified && isActiveEmail ? (
        <OtpComponent type="Student" setIsOtpVerified={setIsOtpVerified} />
      ) : isActiveEmail && isOtpVerified ? (
        // If it is not verified the throw in otp ?
        <ResetPassword email={email} type="Student" />
      ) : (
        <Loading />
      )}
      ;
    </DefaultLayout>
  );
}

export default OtpScreen;
