import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

import Store from '@/utils/Store';
import { NavButton } from '../NavButton';

// Icons
import { AiOutlineMenu } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

// React Context
// import { Cart, Chat, Notification, UserProfile } from '.';
// import { useStateContext } from '../contexts/ContextProvider';

function StudentNavbar() {
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
      <div className="flex justify-between align-middle p-2 md:mx-6 relative">
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
          <Link href="/student/profile" className="flex items-center mt-1">
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
                  <span className="text-gray-400 text-14">Hi, </span>
                  <span className="text-gray-400 font-bold ml-1 text-14">
                    {session?.user.name.split(' ')[0]}
                  </span>
                </p>
                <MdKeyboardArrowDown className="text-gray-400 text-14" />
              </div>
            </TooltipComponent>
          </Link>

          <NavButton
            title="Logout"
            customFunc={(e) => {
              e.preventDefault();
              signOut();
            }}
            icon={<FiLogOut />}
          />
        </div>
      </div>
    </>
  );
}

export default StudentNavbar;
