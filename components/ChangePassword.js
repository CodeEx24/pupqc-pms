import React from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { updatePassword } from './hooks/update';
import { toast } from 'react-toastify';

// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { defaultImage } from '../utils/data';

function ChangePassword({ user, setIsChangePassword }) {
  console.log(user.data.isAdmin);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const updatePasswordMutation = useMutation(updatePassword);
  const submitHandler = async (data) => {
    const dataPass = {
      ...data,
      type:
        user.data.isAdmin === 1
          ? 'Faculty'
          : user.data.isAdmin === 2
          ? 'Admin'
          : 'Student',
    };
    try {
      const res = await updatePasswordMutation.mutateAsync(dataPass);
      setIsChangePassword(false);

      toast.success(res.data.message); // Show success message in toast
    } catch (error) {
      toast.error(error.response.data.message); // Show error message in toast
    }
  };

  useEffect(() => {
    register('newPassword', {
      required: {
        value: true,
        message: 'New Password is required',
      },
      minLength: {
        value: 8,
        message: 'Password must be 8 characters long',
      },
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        message: (
          <>
            Password must contain <br />
            - One uppercase and lowercase letter <br />
            - One number and special character <br />
          </>
        ),
      },
    });
  }, [register]);

  return (
    <>
      <form
        className="md:flex md:flex-nowrap"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="w-full flex-row flex-wrap items-center  md:w-5/12 lg:w-3/12  md:flex md:flex-col">
          <label htmlFor="profile" className="w-5/12 md:w-10/12">
            <Image
              src={user.data.profileImageUrl}
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
        </div>
        <div className="md:w-10/12 w-full flex-col items-center md:flex">
          <div className="flex flex-col md:ml-5 w-full">
            <div className="hidden md:block">
              <h4 className=" text-center font-semibold text-2xl mt-5 lg:text-2xl md:mt-10 md:text-start md:px-3">
                {user.data.name}
              </h4>
              <h4 className="text-p text-center  md:text-lg md:text-start md:px-3">
                {user.data.email}
              </h4>
            </div>
            <hr className="ml-3 md:mx-2 mt-5" />
            <div className="p-3 lg:pt-3 lg:p-3">
              <div className=" block mb-2 my-6">
                <h3 className="text-p mb-3 ml-1">Current Password:</h3>
                <input
                  type="password"
                  id="password"
                  className="w-full border px-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Please enter current password',
                    },
                  })}
                />

                {errors.password && (
                  <p className="text-sm text-red-500 pl-1 pt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className=" block mb-2 my-6">
                <h3 className="text-p mb-3 ml-1">New Password:</h3>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full border px-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                  {...register('newPassword')}
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-500 pl-1 pt-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className=" block mb-2 my-6">
                <h3 className="text-p mb-3 ml-1">Confirm Password:</h3>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full border px-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                  {...register('confirmPassword', {
                    required: {
                      value: true,
                      message: 'Confirm Password is required',
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 pl-1 pt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn-primary hover:bg-opacity-60 smooth-transition mt-3 "
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
export default ChangePassword;
