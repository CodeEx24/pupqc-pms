import DefaultLayout from '@/components/DefaultLayout';
import React from 'react';
import loginAuth from '@/utils/authentication/loginAuth';
import ForgotPassword from '@/components/password/ForgotPassword';

function ForgotPasswordScreen() {
  return (
    <DefaultLayout title="Student Portal">
      <ForgotPassword type="Student" />
    </DefaultLayout>
  );
}

export default loginAuth(ForgotPasswordScreen);
