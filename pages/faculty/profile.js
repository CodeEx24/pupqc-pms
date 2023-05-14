import React, { useState } from 'react';
import FacultyLayout from '@/components/faculty/FacultyLayout';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../../components/hooks/FacultySubject/fetch';
import Image from 'next/image';

import UserEdit from '../../components/UserEdit';

function ProfileScreen() {
  // Get user info
  const {
    data: user,
    status,
    refetch: refetchUser,
  } = useQuery(['user'], fetchCurrentUser);

  const [editProfile, setEditProfile] = useState(true);

  return (
    <FacultyLayout title="Subject Setup">
      <div className="bg-white p-10 rounded-xl">
        <div className="flex justify-between">
          <h1 className="text-sky-400 font-bold text-3xl mb-5 ">
            {editProfile ? 'Edit Profile' : 'Personal Data'}
          </h1>
          {editProfile && (
            <button
              onClick={() => setEditProfile(!editProfile)}
              className="my-auto text-sky-500"
            >
              Go back
            </button>
          )}
        </div>
        {status === 'success' && !editProfile ? (
          <div className="grid grid-rows-3 grid-cols-6 grid-flow-col gap-4">
            <div className=" col-span-2 row-span-1 my-auto md:row-span-3 md:m-0 lg:col-span-1">
              <Image
                src={user.data.profileImageUrl}
                height={500}
                width={100}
                className="rounded-full w-full"
                alt="avatar.jpg"
                decoding="async"
              />
            </div>

            <div className="pl-3 lg:pt-3 lg:p-0 col-span-4 row-span-1 col-start-3 my-auto md:my-0 md:row-span-1 md:col-span-3 md:col-start-3 lg:col-span-4 lg:col-start-2 lg:my-auto lg:pl-4">
              <h4 className="font-semibold text-lg lg:text-2xl">
                {user.data.name}
              </h4>
              <h4 className="mb-3 lg:mb-0 text-sm md:text-lg">
                {user.data.email}
              </h4>
              <button
                onClick={() => setEditProfile(!editProfile)}
                className="mb-3 lg:mb-0 text-sky-400"
              >
                Edit Profile
              </button>
            </div>

            <div className=" row-start-2 col-start-1 col-span-6 row-span-4 md:row-start-2 md:col-start-3 md:row-span-2 lg:col-span-6 lg:pl-4">
              <hr className="ml-3 md:m-0" />
              <div className="p-3 lg:pt-3 lg:p-0">
                <div className=" flex mb-2">
                  <h3 className="text-gray-700 w-3/6 md:w-2/6">Gender:</h3>
                  <p className="">{user.data.gender}</p>
                </div>
                <div className=" flex mb-2">
                  <h3 className="text-gray-700 w-3/6 md:w-2/6">
                    Mobile Phone:
                  </h3>
                  <p className="">{user.data.mobileNo}</p>
                </div>
                <div className=" flex mb-2">
                  <h3 className="text-gray-700 w-3/6 md:w-2/6">Birth Date:</h3>
                  <p className="">{user.data.dateOfBirth}</p>
                </div>
                <div className=" flex mb-2">
                  <h3 className="text-gray-700 w-3/6 md:w-2/6">Address:</h3>
                  <p className="w-3/6">{user.data.residentialAddress}</p>
                </div>
              </div>
            </div>
          </div>
        ) : status === 'success' && editProfile ? (
          <UserEdit
            user={user}
            setEditProfile={setEditProfile}
            refetchUser={refetchUser}
          />
        ) : (
          'Loading'
        )}
      </div>
    </FacultyLayout>
  );
}

ProfileScreen.auth = {
  role: 'faculty',
};

export default ProfileScreen;
