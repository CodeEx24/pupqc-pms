import withFacultyAuth from '@/utils/authentication/withFacultyAuth';
import React from 'react';

function HomeScreen() {
  return <div>HomeScreen</div>;
}

export default withFacultyAuth(HomeScreen);
