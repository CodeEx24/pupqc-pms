import Link from 'next/link';
import React from 'react';

import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';

import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { teacherLinks } from '@/utils/data';

import Store from '@/utils/Store';
import { useRouter } from 'next/router';

function FacultySidebar() {
  const router = useRouter();

  const activeLink = router.pathname.substring('/faculty/'.length);

  const menu = Store((state) => state.menu);
  const { activeMenu } = menu;

  const setActiveMenu = Store((state) => state.setActiveMenu);

  const activeLinkClass =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 bg-sky-400';
  const normalLinkClass =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700  hover:bg-light-gray m-2';

  return (
    <div className="pl-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 shadow-lg shadow-right">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-h6 items-center gap-3 ml-3 mt-4 flex  font-poppins font-extrabold tracking-tight "
            >
              <SiShopware /> PUPQC PMS
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block lg:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          <div className="mt-10">
            {teacherLinks.map((item) => (
              <div key={item.title}>
                <p className="text-p m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <Link
                    href={`/faculty/${link.href}`}
                    key={link.name}
                    className={
                      activeLink === link.href
                        ? activeLinkClass
                        : normalLinkClass
                    }
                  >
                    {link.icon}
                    <span className="text-p capitalize">{link.name}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default FacultySidebar;
