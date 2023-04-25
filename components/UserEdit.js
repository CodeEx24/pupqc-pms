import React from 'react';
import avatar from '@/public/usericon/avatar.jpg';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

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
    // formState: {},
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

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="grid grid-rows-6 grid-cols-6 grid-flow-col gap-4 md:grid-rows-3">
        <div className=" col-span-2 row-span-2 my-auto md:row-span-3 md:m-0 lg:col-span-1">
          <label htmlFor="profile">
            <Image
              height={100}
              width={100}
              className="rounded-full w-full "
              src={avatar}
              alt="avatar.jpg"
            />
          </label>
        </div>

        <div className="col-span-2 row-start-3 col-start-3 flex justify-center md:row-start-4 md:col-start-1 md:block">
          <div>
            <input
              type="file"
              id="profile"
              name="avatar"
              className="px-8 md:px-2"
              {...register('profile')}
            />
          </div>
        </div>
        <div className="pl-3 lg:pt-3 lg:p-0 col-span-4 row-span-2 my-auto md:my-0 md:row-span-1 md:col-span-3 md:col-start-3 lg:col-span-4 lg:col-start-2 lg:my-auto lg:pl-4">
          <h4 className="font-semibold text-lg lg:text-2xl">
            {user.data.name}
          </h4>
          <h4 className="mb-3 lg:mb-0 text-sm md:text-lg">{user.data.email}</h4>
        </div>

        <div className=" row-start-4 col-start-1 col-span-6 row-span-4 md:row-start-2 md:col-start-3 md:row-span-2 lg:col-span-6 lg:pl-4">
          <hr className="ml-3 md:m-0" />
          <div className="p-3 lg:pt-3 lg:p-0">
            <div className=" flex mb-2">
              <h3 className="text-gray-700 w-3/6 md:w-2/6">Gender:</h3>
              <select name="" id="gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className=" flex mb-2">
              <h3 className="text-gray-700 w-3/6 md:w-2/6">Mobile Phone:</h3>
              <input
                type="number"
                id="mobileNo"
                defaultValue={user.data.mobileNo}
                className="w-3/6 border px-2"
                {...register('mobileNo')}
              />
              {/* <p className="">{user.data.mobileNo}</p> */}
            </div>
            <div className=" flex mb-2">
              <h3 className="text-gray-700 w-3/6 md:w-2/6">Birth Date:</h3>
              <input
                type="date"
                id="start"
                name="trip-start"
                className="w-3/6 border px-2"
                defaultValue={formattedDOB}
                // min="2018-01-01"
                // max="2018-12-31"
              />

              {/* <p className="">{user.data.dateOfBirth}</p> */}
            </div>
            <div className=" flex mb-2">
              <h3 className="text-gray-700 w-3/6 md:w-2/6">Address:</h3>
              <input
                type="text"
                id="residentialAddress"
                defaultValue={user.data.residentialAddress}
                className="w-3/6 border px-2"
                {...register('residentialAddress')}
              />
              {/* <p className="w-3/6">{user.data.residentialAddress}</p> */}
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
