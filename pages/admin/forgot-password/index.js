import DefaultLayout from '@/components/DefaultLayout';
import React from 'react';
import loginAuth from '@/utils/authentication/loginAuth';
import ForgotPassword from '@/components/password/ForgotPassword';

function ForgotPasswordScreen() {
  return (
    <DefaultLayout title="Admin Portal">
      <ForgotPassword type="Admin" />
    </DefaultLayout>
  );
}

export default loginAuth(ForgotPasswordScreen);
