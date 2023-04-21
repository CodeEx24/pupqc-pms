import DefaultLayout from '@/components/DefaultLayout';
import React from 'react';
import loginAuth from '@/utils/authentication/loginAuth';
import ForgotPassword from '@/components/password/ForgotPassword';

function ForgotPasswordScreen() {
  return (
    <DefaultLayout title="Faculty Portal">
      <ForgotPassword type="Faculty" />
    </DefaultLayout>
  );
}

export default loginAuth(ForgotPasswordScreen);
