import DefaultLayout from '@/components/DefaultLayout';
import React from 'react';
import loginAuth from '@/utils/authentication/loginAuth';
import ForgotPassword from '../../components/ForgotPassword';

function FacultyForgotPassword() {
  return (
    <DefaultLayout title="Faculty Portal">
      <ForgotPassword type="Student" />
    </DefaultLayout>
  );
}

export default loginAuth(FacultyForgotPassword);
