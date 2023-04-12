import React, { useEffect } from 'react';

// Icons
import { AiOutlineMenu } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import Store from '@/utils/Store';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

import avatar from '@/public/usericon/avatar.jpg';
import { NavButton } from './NavButton';

// React Context
// import { Cart, Chat, Notification, UserProfile } from '.';
// import { useStateContext } from '../contexts/ContextProvider';

function StudentNavbar() {
  const { data: session } = useSession();

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
  }, []);

  // Setting the menu if it is visible or not
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

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
          <NavButton
            title="Chat"
            dotColor="#03C9D7"
            //   customFunc={() => handleClick('chat')}
            //   color={currentColor}
            icon={<BsChatLeft />}
          />

          <NavButton
            title="Notifications"
            dotColor="#03C9D7"
            //   customFunc={() => handleClick('notification')}
            //   color={currentColor}
            icon={<RiNotification3Line />}
          />

          <NavButton
            title="Logout"
            customFunc={(e) => {
              e.preventDefault();
              // console.log('LogOut');
              signOut();
            }}
            //   customFunc={() => handleClick('cart')}
            //   color={currentColor}
            icon={<FiLogOut />}
          />

          <TooltipComponent content="Profile" position="BottomCenter">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              // onClick={() => handleClick('userProfile')}
            >
              <Image
                height={50}
                width={50}
                className="rounded-full w-8 h-8"
                src={avatar}
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

          {/* {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />} */}
        </div>
      </div>
      {/* <div className="font-bold text-2xl flex justify-center lg:hidden">
        Polytechnic University of the Philippines
      </div> */}
    </>
  );
}

export default StudentNavbar;