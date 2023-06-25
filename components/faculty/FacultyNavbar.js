import React, { useEffect } from 'react';
import Store from '@/utils/Store';
import Image from 'next/image';
import Link from 'next/link';
// Icons
import { AiOutlineMenu } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { signOut } from 'next-auth/react';

import { NavButton } from '../NavButton';
import { useSession } from 'next-auth/react';

function FacultyNavbar() {
  const { data: session, status } = useSession();

  const menu = Store((state) => state.menu);
  const { screenSize, activeMenu } = menu;

  const setScreenSize = Store((state) => state.setScreenSize);
  const setActiveMenu = Store((state) => state.setActiveMenu);

  // This useEffect is getting the current window size to set it in the ContextProvider
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    // Removing the event listener because it is already get the size of window
    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  // Setting the menu if it is visible or not
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  if (status === 'loading') {
    return null;
  }

  return (
    <>
      <div className="flex justify-between align-middle p-2 md:mx-6 relative bg-white md:bg-gray-100 z-2">
        <NavButton
          title="Menu"
          customFunc={() => setActiveMenu(!activeMenu)}
          // color={currentColor}
          icon={<AiOutlineMenu />}
        />
        <div className="font-bold hidden md:flex lg:text-1xl md:text-lg my-auto">
          Polytechnic University of the Philippines
        </div>
        <div className="flex align-middle">
          <Link href="/faculty/profile" className="flex items-center">
            <TooltipComponent content="Profile" position="BottomCenter">
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-light-gray rounded-lg"
                // onClick={() => handleClick('userProfile')}
              >
                <Image
                  height={50}
                  width={50}
                  className="rounded-full w-8 h-8"
                  src={session?.user.profile}
                  alt="avatar.jpg"
                />
                <p>
                  <span className="text-gray-400 text-sm">Hi, </span>
                  <span className="text-gray-400 font-bold ml-1 text-sm">
                    {session?.user.name.split(' ')[0]}
                  </span>
                </p>
                <MdKeyboardArrowDown className="text-gray-400 text-sm" />
              </div>
            </TooltipComponent>
          </Link>

          <NavButton
            title="Logout"
            customFunc={(e) => {
              e.preventDefault();
              // console.log('LogOut');
              signOut();
            }}
            icon={<FiLogOut />}
          />
        </div>
      </div>
    </>
  );
}

export default FacultyNavbar;
