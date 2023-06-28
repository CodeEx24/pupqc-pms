import { AiFillHome, AiFillSnippets } from 'react-icons/ai';

import {
  FaUser,
  FaBook,
  FaAddressBook,
  FaIdCard,
  FaChartBar,
  FaFileMedicalAlt,
  FaFolderMinus,
  FaUserTie,
} from 'react-icons/fa';
import { IoMdPeople } from 'react-icons/io';

export const teacherLinks = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'home',
        href: 'home',
        icon: <AiFillHome />,
      },
      {
        name: 'profile',
        href: 'profile',
        icon: <FaUser />,
      },
    ],
  },

  {
    title: 'Pages',
    links: [
      {
        name: 'subject',
        href: 'subject',
        icon: <FaBook />,
      },
      {
        name: 'class subject',
        href: 'class-subject',
        icon: <FaAddressBook />,
      },
      {
        name: 'student list',
        href: 'student-list',
        icon: <FaIdCard />,
      },
      {
        name: 'performance',
        href: 'performance',
        icon: <FaChartBar />,
      },
      {
        name: 'grades',
        href: 'grades',
        icon: <AiFillSnippets />,
      },
    ],
  },
];

export const adminLinks = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'home',
        href: 'home',
        icon: <AiFillHome />,
      },
      {
        name: 'profile',
        href: 'profile',
        icon: <FaUser />,
      },
    ],
  },
  {
    title: 'Pages',
    links: [
      {
        name: 'subject',
        href: 'subject',
        icon: <FaBook />,
      },
      {
        name: 'criteria',
        href: 'criteria',
        icon: <FaFileMedicalAlt />,
      },
      {
        name: 'class list',
        href: 'class-list',
        icon: <IoMdPeople />,
      },
      {
        name: 'class assign',
        href: 'class-assign',
        icon: <FaFolderMinus />,
      },
      {
        name: 'teacher list',
        href: 'teacher-list',
        icon: <FaUserTie />,
      },
    ],
  },
];

export const studentLinks = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'home',
        href: 'home',
        icon: <AiFillHome />,
      },
      {
        name: 'profile',
        href: 'profile',
        icon: <FaUser />,
      },
      {
        name: 'grades',
        href: 'grades',
        icon: <AiFillSnippets />,
      },
      {
        name: 'performance',
        href: 'performance',
        icon: <FaChartBar />,
      },
    ],
  },
];
