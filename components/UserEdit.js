import React, { useState } from 'react';
import avatar from '@/public/usericon/avatar.jpg';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Select from 'react-select';

// import { Cloudinary } from 'cloudinary-core';

// const cloudinary = new Cloudinary({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

function UserEdit({ user }) {
  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  // Submit Handler when click the submit button
  const submitHandler = async (data) => {
    const formData = new FormData();
    formData.append('file', data.profile[0]);

    // try {
    //   const result = await cloudinary.v2.uploader.upload(formData.get('file'), {
    //     folder: 'avatars',
    //     use_filename: true,
    //   });

    //   setAvatar(result.secure_url);
    //   router.push('/profile');
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const dateOfBirth = new Date(user.data.dateOfBirth);
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

  const [selectedGender, setSelectedGender] = useState({
    label: user.data.gender,
    value: user.data.gender,
  });

  console.log(selectedGender);

  const handleInputChange = (name, e) => {
    if (!e) {
      return;
    }

    setValue(name, e.value);
    clearErrors(name);
    setSelectedGender(e);
  };

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
              id="file"
              name="file"
              className="opacity-0 absolute "
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
                value={selectedGender}
                options={genderOptions}
                defaultValue={{ value: selectedGender, label: selectedGender }}
                isClearable
                id="gender"
                {...register('gender', { required: true })}
                onChange={(e) => handleInputChange('gender', e)}
                className=" w-full lg:w-1/2"
                styles={selectStyles('gender')}
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
                id="start"
                name="trip-start"
                className="w-full border px-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                defaultValue={formattedDOB}
                // min="2018-01-01"
                // max="2018-12-31"
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
