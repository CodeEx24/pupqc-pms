import React from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { studentLinks } from '../../utils/data';
import Image from 'next/image';

import { signOut } from 'next-auth/react';
import { FiLogOut } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

function StudentNavbar() {
  const router = useRouter();

  const activeLink = router.pathname
    .substring('/student/'.length)
    .split('/')[0];

  // State to manage the visibility of the menu
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const activeLinkClass = 'text-secondary text-p font-semibold';
  const normalLinkClass =
    'text-gray-700 hover:text-secondary hover:opacity-80 text-p font-semibold';

  return (
    <>
      <nav className="bg-white border-gray-200 shadow-md z-10">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
          <Link href="/student/home" className="flex items-center">
            <Image
              width={50}
              height={50}
              src="https://www.pup.edu.ph/resources/images/logo.png"
              className="mr-4"
              alt="Flowbite Logo"
            />
            <span className="self-center text-h5 font-semibold whitespace-nowrap text-gray-700">
              PUPSIS
            </span>
          </Link>
          <button
            onClick={toggleMenu} // Add onClick event handler to toggle the menu
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
              {studentLinks.map((item) =>
                item.links.map((link) => (
                  <Link
                    href={`/student/${link.href}`}
                    key={link.name}
                    className={
                      activeLink === link.href
                        ? activeLinkClass
                        : normalLinkClass
                    }
                  >
                    {/* {link.icon} */}
                    <span className="capitalize text-black-900">
                      {link.name}
                    </span>
                  </Link>
                ))
              )}
              <TooltipComponent content={'Log Out'} position="BottomCenter">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                  // style={{ color }}
                  className="relative text-xl rounded-full hover:bg-light-gray hover:text-secondary pt-1"
                >
                  <span className="absolute inline-flex rounded-full h-2 w-2 "></span>
                  <FiLogOut />
                </button>
              </TooltipComponent>
            </ul>{' '}
          </div>
        </div>
      </nav>
    </>
  );
}

export default StudentNavbar;
