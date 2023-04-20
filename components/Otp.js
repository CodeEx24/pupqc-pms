import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef } from 'react';

const OtpComponent = ({ type }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleChange = (index, event) => {
    if (isNaN(parseInt(event.target.value))) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = event.target.value;

    setOtp(newOtp);

    // Move focus to the next input if a single digit is entered
    if (event.target.value.length === 1 && index < refs.length - 1) {
      refs[index + 1].current.focus();
    } else if (index > 0 && newOtp[index] && !newOtp[index - 1]) {
      // Update the value of the current input without moving focus
      const currentRef = refs[index].current;
      currentRef.value = newOtp[index];
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredOtp = otp.join('');
    console.log(`OTP entered: ${enteredOtp}`);
    // Add your OTP verification logic here
  };

  return (
    <>
      <div className=" flex h-screen w-screen items-center px-6 py-20 md:px-28 lg:w-[42rem] lg:pr-0">
        <div className=" bg-black bg-opacity-80 p-10  text-center rounded-lg ">
          <Link
            href={`${type === 'Student' ? '/student' : '/faculty'}`}
            className="text-white text-left font-medium flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back
          </Link>
          {/* PUP Logo and Title */}
          <div>
            <Image
              src="/logo/puplogo.png"
              alt="PUPLogo"
              width={100}
              height={100}
              // Make the logo width responsive using Tailwind classes
              className="object-cover object-center rounded-lg mx-auto w-16 md:w-28 lg:w-32"
            />
            <h1 className="text-white font-poppins text-2xl font-bold mt-3 md:text-4xl md:mt-8">
              PUPQC {type} Module
            </h1>
            <p className="text-white text-md font-poppins mt-3 mb-3 md:text-lg">
              Provide your email below
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-between w-full mb-8">
              {refs.map((ref, index) => (
                <input
                  key={index}
                  type="text"
                  name="otp"
                  value={otp[index]}
                  onChange={(event) => handleChange(index, event)}
                  maxLength="1"
                  className="shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-16 mr-2 text-center"
                  ref={ref}
                />
              ))}
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-sky-700 w-full text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpComponent;
