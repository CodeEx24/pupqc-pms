import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Select from 'react-select';
import axios from 'axios';
import { toast } from 'react-toastify';

function UserEdit({ user, setEditProfile, refetchUser }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [avatar, setAvatar] = useState(user.data.profileImageUrl);

  const submitHandler = async (data) => {
    // Check if a profile image exists
    if (data.profile?.length) {
      const formData = new FormData();
      formData.append('file', data.profile[0]);
      formData.append('upload_preset', 'pupqc_upload_avatar');

      try {
        // Upload the profile image to Cloudinary
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/daevedaio/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
        const file = await res.json();

        // Update user profile image URL with Cloudinary URL
        const updatedUser = {
          ...user,
          data: {
            ...data,
            profileImageUrl: file.secure_url,
          },
        };

        // Update user profile
        const userDataUpdate = await axios.post('/api/user/update', {
          ...updatedUser.data,
          type: 'Teacher',
        });
        const image = userDataUpdate.data.result.profileImageUrl;
        setAvatar(image);
        toast.success('Information updated successfully');
      } catch (error) {
        toast.error(error);
      }
    } else {
      try {
        // If no profile image exists, update the user profile with the existing profileImageUrl
        await axios.post(`/api/user/update`, {
          data,
          type: 'Teacher',
        });
        toast.success('Information updated successfully');
      } catch (error) {
        toast.error(error);
      }
    }
    refetchUser();
    // Set the profile back to the user and also update the
    setEditProfile(false);
  };

  const dateOfBirth = new Date(user.data.dateOfBirth);
  dateOfBirth.setDate(dateOfBirth.getDate() + 1); // In format
  const formattedDate = dateOfBirth.toISOString().substring(0, 10);
  const formattedDOB = formattedDate.toString();

  // Select styles
  const selectStyles = (name) => {
    return {
      control: (baseStyles, state) => ({
        ...baseStyles,
        borderRadius: '0.5rem',
        borderColor:
          errors[name] && state.isFocused
            ? '#f56565'
            : state.isFocused
            ? '#4299E1'
            : errors[name]
            ? '#f565658c'
            : '#CBD5E0',
        backgroundColor: '#F9FAFB',
        padding: '2px',
        boxShadow: 'none',
        '&:hover': {
          borderColor: '',
        },
      }),
    };
  };

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="grid grid-rows-6 grid-cols-6 gap-1 md:grid-rows-4 lg:grid-rows-12 lg:grid-cols-12">
        {/* PROFILE AVATAR */}
        <div className=" col-span-2 row-span-1 md:col-span-2 md:row-span-2 md:m-0 w-full lg:col-span-3 lg:row-span-2 lg:col-start-1 lg:row-start-1">
          <label htmlFor="profile">
            <Image
              height={150}
              width={150}
              className="rounded-full w-full "
              src={avatar}
              decoding="async"
              alt="avatar.jpg"
            />
          </label>
        </div>

        {/*  NAME AND EMAIL */}
        <div className="pl-3 lg:pt-3 lg:p-0 col-span-4 row-span-1 col-start-3 my-auto md:my-0 md:row-span-1 md:col-span-3 md:col-start-3 lg:col-span-9 lg:row-span-1 lg:col-start-4 lg:row-start-1 lg:my-auto lg:pl-4 flex flex-col justify-center">
          <h4 className="font-semibold text-lg lg:text-2xl">
            {user.data.name}
          </h4>
          <h4 className="mb-3 lg:mb-0 text-sm md:text-lg">{user.data.email}</h4>
        </div>

        {/* INPUT FILE FOR AVATAR */}
        <div className="col-span-6 row-start-2 pt-3 md:pt-1 lg:pt-3 flex justify-center md:row-start-3 md:col-start-1 md:col-span-2 md:block lg:col-span-3 lg:row-span-1 lg:col-start-1 lg:row-start-3 lg:p-2 ">
          <div className="w-full px-3">
            <input
              type="file"
              id="profile"
              name="profile"
              className="opacity-0 absolute "
              {...register('profile')}
            />
            <div className="flex items-center justify-center h-10 lg:h-11 rounded-lg border-dashed border-gray-300 border-2 cursor-pointer hover:bg-gray-100 s">
              <svg
                className="w-6 h-6 text-gray-400 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M14.914 11.757a3 3 0 11-4.242-4.242l-3.535 3.536a2 2 0 002.828 2.828l3.535-3.536zm1.414-7.071a5 5 0 11-7.07 7.071l-3.536 3.536A5 5 0 104.93 15.536l3.536-3.536a3 3 0 014.242-4.242l3.536-3.535z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-gray-500 font-medium">Change Avatar</span>
            </div>
          </div>
        </div>

        {/* INPUT FIELDS */}
        <div className=" row-start-3 col-start-1 col-span-6 row-span-6 md:row-span-5 md:row-start-2 md:col-start-3 lg:col-span-9 lg:row-span-6 lg:col-start-4 lg:row-start-2 lg:p-3">
          <hr className="ml-3 md:mx-2 lg:m-0" />
          <div className="p-3 lg:pt-3 lg:p-0">
            <div className=" block mb-2">
              <h3 className="text-gray-700 w-full md:w-2/6">Gender:</h3>
              <Select
                value={{ value: user.data.gender, label: user.data.gender }}
                options={genderOptions}
                isClearable
                className=" w-full "
                styles={selectStyles('gender')}
                isDisabled={true}
              />
            </div>
            <div className="block mb-2 my-6">
              <h3 className="text-gray-700 w-full md:w-2/6">Mobile Phone:</h3>
              <input
                type="number"
                id="mobileNo"
                defaultValue={user.data.mobileNo}
                className="w-full px-2 py-2.5 text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-sky-500 focus:border-sky-500 block"
                {...register('mobileNo')}
              />
            </div>

            <div className="block mb-2 my-6">
              <h3 className="text-gray-700 w-full md:w-2/6">Birth Date:</h3>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="w-full border px-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                defaultValue={formattedDOB}
                // min="2018-01-01"
                // max="2018-12-31"
                {...register('dateOfBirth')}
              />
            </div>
            <div className=" block mb-2 my-6">
              <h3 className="text-gray-700 w-full md:w-2/6">Address:</h3>
              <input
                type="text"
                id="residentialAddress"
                defaultValue={user.data.residentialAddress}
                className="w-full border px-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                {...register('residentialAddress')}
              />
            </div>
          </div>
        </div>
      </div>

      <button type="submit" className="btn-primary mt-3 mx-2">
        Save Changes
      </button>
    </form>
  );
}
export default UserEdit;
