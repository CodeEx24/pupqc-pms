import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Select from 'react-select';
import axios from 'axios';
import { toast } from 'react-toastify';
import { defaultImage } from '../utils/data';

function UserEdit({ user, setEditProfile, refetchUser }) {
  console.log(user.data.isAdmin);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [avatar, setAvatar] = useState(user.data.profileImageUrl);

  const submitHandler = async (data) => {
    data.profile = data.profile1?.length ? data.profile1 : data.profile2;
    console.log(data);
    console.log('SUBMITTED DATA PROFILE:', data.profile);

    if (user.data.profileImageUrl !== defaultImage && data.profile?.length) {
      try {
        await axios.post('/api/cloudinary/delete', {
          public_id: user.data.profileImageUrl.split('/').pop().split('.')[0],
        });
      } catch (error) {
        toast.error(error);
        return;
      }
    }

    if (data.profile?.length) {
      const formData = new FormData();
      formData.append('file', data.profile[0]);
      formData.append('upload_preset', 'pupqc_upload_avatar');

      try {
        console.log('RESULT PENDING:');
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/daevedaio/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
        const file = await res.json();

        if (res) {
          console.log('RESULT:', res);
        }

        const updatedUser = {
          ...user,
          data: {
            ...data,
            profileImageUrl: file.secure_url,
          },
        };

        const userDataUpdate = await axios.post('/api/user/update', {
          data: { ...updatedUser.data },
          type: user.data.isAdmin ? 'Teacher' : 'Student',
        });
        const image = userDataUpdate.data.result.profileImageUrl;
        setAvatar(image);
        toast.success('Information updated successfully');
      } catch (error) {
        toast.error(error);
      }
    } else {
      try {
        await axios.post(`/api/user/update`, {
          data,
          type: user.data.isAdmin ? 'Teacher' : 'Student',
        });
        toast.success('Information updated successfully');
      } catch (error) {
        toast.error(error);
      }
    }

    await refetchUser();
    setEditProfile(false);
  };

  const dateOfBirth = new Date(user.data.dateOfBirth);
  dateOfBirth.setDate(dateOfBirth.getDate() + 1);
  const formattedDate = dateOfBirth.toISOString().substring(0, 10);
  const formattedDOB = formattedDate.toString();

  const selectStyles = (name) => ({
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
  });

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setAvatar(reader.result);
    };
  };

  return (
    <>
      <form
        className="md:flex md:flex-nowrap"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="w-full flex-row flex-wrap items-center  md:w-5/12 lg:w-3/12  md:flex md:flex-col">
          <label htmlFor="profile" className="w-5/12 md:w-10/12">
            <Image
              src={avatar}
              priority={true}
              height={150}
              width={150}
              className="rounded-full w-full"
              decoding="async"
              alt="avatar.jpg"
              style={{ objectFit: 'cover' }}
            />
          </label>
          <div className="md:hidden w-7/12">
            <h4 className=" text-center font-semibold text-2xl  lg:text-2xl md:mt-10 md:text-start md:px-3">
              {user.data.name}
            </h4>
            <h4 className=" text-center text-md md:text-lg md:text-start md:px-3">
              {user.data.email}
            </h4>
          </div>
          <div className="md:px-3 w-full px-3 relative">
            <input
              type="file"
              id="profile1"
              name="profile1"
              className="opacity-0 absolute w-full pr-5 pb-2 h-12"
              {...register('profile1')}
              onChange={(e) => handleFileUpload(e)}
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
        <div className="md:w-10/12 w-full flex-col items-center md:flex">
          <div className="flex flex-col md:ml-5 w-full">
            <div className="hidden md:block">
              <h4 className=" text-center font-semibold text-2xl mt-5 lg:text-2xl md:mt-10 md:text-start md:px-3">
                {user.data.name}
              </h4>
              <h4 className=" text-center text-md md:text-lg md:text-start md:px-3">
                {user.data.email}
              </h4>
            </div>
            <hr className="ml-3 md:mx-2 mt-5" />
            <div className="p-3 lg:pt-3 lg:p-3">
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
                  {...register('mobileNo', {
                    required: {
                      value: true,
                      message: 'Mobile number is required',
                    },
                    pattern: {
                      value: /^09\d{9}$/,
                      message:
                        'Mobile number must be in the format of 09123456789',
                    },
                  })}
                />
                {errors.mobileNo && (
                  <p className="text-sm text-red-500">
                    {errors.mobileNo.message}
                  </p>
                )}
              </div>

              <div className="block mb-2 my-6">
                <h3 className="text-gray-700 w-full md:w-2/6">Birth Date:</h3>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="w-full border px-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                  defaultValue={formattedDOB}
                  max={new Date().toISOString().split('T')[0]}
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
                  {...register('residentialAddress', {
                    required: {
                      value: true,
                      message: 'Residential address is required',
                    },
                  })}
                />
                {errors.residentialAddress && (
                  <p className="text-sm text-red-500">
                    {errors.residentialAddress.message}
                  </p>
                )}
              </div>

              <button type="submit" className="btn-primary mt-3">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* MOBILE NAVIGATION
      <form className="md:hidden" onSubmit={handleSubmit(submitHandler)}>
        <div className="w-full flex flex-wrap items-center ">
          <label htmlFor="profile" className="w-4/12">
            <Image
              src={avatar}
              priority={true}
              height={150}
              width={150}
              className="rounded-full"
              decoding="async"
              alt="avatar.jpg"
              style={{ objectFit: 'cover' }}
            />
          </label>
          <div className="w-8/12 pl-3">
            <h4 className="font-semibold text-xl">{user.data.name}</h4>
            <h4 className="text-md">{user.data.email}</h4>
          </div>

          <div className="w-full px-3 mt-3">
            <input
              type="file"
              id="profile2"
              name="profile2"
              className="opacity-0 absolute h-10 w-8/12 "
              {...register('profile2')}
              onChange={(e) => handleFileUpload(e)}
            />
            <div className="flex items-center justify-center h-10 rounded-lg border-dashed border-gray-300 border-2 cursor-pointer hover:bg-gray-100">
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

        <div className="w-full flex flex-col items-center md:hidden">
          <div className="flex flex-col w-full">
            <hr className="ml-3 mt-5" />
            <div className="p-3">
              <div className=" block mb-2">
                <h3 className="text-gray-700 w-full">Gender:</h3>
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
                <h3 className="text-gray-700 w-full">Mobile Phone:</h3>
                <input
                  type="number"
                  id="mobileNo"
                  defaultValue={user.data.mobileNo}
                  className="w-full px-2 py-2.5 text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-sky-500 focus:border-sky-500 block"
                  {...register('mobileNo', {
                    required: {
                      value: true,
                      message: 'Mobile number is required',
                    },
                    pattern: {
                      value: /^09\d{9}$/,
                      message:
                        'Mobile number must be in the format of 09123456789',
                    },
                  })}
                />
                {errors.mobileNo && (
                  <p className="text-sm text-red-500">
                    {errors.mobileNo.message}
                  </p>
                )}
              </div>

              <div className="block mb-2 my-6">
                <h3 className="text-gray-700 w-full">Birth Date:</h3>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="w-full border px-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                  defaultValue={formattedDOB}
                  max={new Date().toISOString().split('T')[0]}
                  {...register('dateOfBirth')}
                />
              </div>
              <div className=" block mb-2 my-6">
                <h3 className="text-gray-700 w-full">Address:</h3>
                <input
                  type="text"
                  id="residentialAddress"
                  defaultValue={user.data.residentialAddress}
                  className="w-full border px-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                  {...register('residentialAddress', {
                    required: {
                      value: true,
                      message: 'Residential address is required',
                    },
                  })}
                />
                {errors.residentialAddress && (
                  <p className="text-sm text-red-500">
                    {errors.residentialAddress.message}
                  </p>
                )}
              </div>

              <button type="submit" className="btn-primary mt-3">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form> */}
    </>
  );
}
export default UserEdit;
