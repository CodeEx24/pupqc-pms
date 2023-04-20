import React from 'react';
import DefaultLayout from '../../components/DefaultLayout';
import OtpComponent from '../../components/Otp';

function otp() {
  return (
    <DefaultLayout title="Faculty Portal">
      <OtpComponent type="Faculty" />
    </DefaultLayout>
  );
}

export default otp;
