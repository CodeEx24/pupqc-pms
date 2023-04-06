import bcrypt from 'bcryptjs';

import {
  AiFillHome,
  AiFillIdcard,
  AiFillCalendar,
  AiFillSnippets,
  AiFillDiff,
} from 'react-icons/ai';

import { RiContactsLine } from 'react-icons/ri';

import { FaMoneyBillAlt } from 'react-icons/fa';

import { TbReportAnalytics } from 'react-icons/tb';

export const data = {
  students: [
    {
      name: 'John Doe',
      email: 'student@gmail.com',
      password: bcrypt.hashSync('admin24'),
      gender: 'Male',
      dateOfBirth: new Date('1995-05-01'),
      placeOfBirth: 'New York',
      mobileNo: '1234567890',
      residentialAddress: '123 Main Street, New York',
      isAdmin: false,
    },
    {
      name: 'Jocarl Basco',
      email: 'jocarlbasco24@gmail.com',
      password: bcrypt.hashSync('admin24'),
      gender: 'Male',
      dateOfBirth: new Date('1997-08-15'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '0987654321',
      residentialAddress: '456 Elm Street, Los Angeles',
      isAdmin: false,
    },
    {
      name: 'Bob Smith',
      email: 'bobsmith@gmail.com',
      password: bcrypt.hashSync('password789'),
      gender: 'Male',
      dateOfBirth: new Date('1990-12-25'),
      placeOfBirth: 'Chicago',
      mobileNo: '5551234567',
      residentialAddress: '789 Oak Street, Chicago',
      isAdmin: false,
    },
  ],
  teachers: [
    {
      name: 'Sarah Smith',
      email: 'sarahsmith@gmail.com',
      password: bcrypt.hashSync('sarah123'),
      gender: 'Female',
      dateOfBirth: new Date('1990-03-25'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5551112222',
      residentialAddress: '123 Main Street, San Francisco',
      isAdmin: true,
    },
    {
      name: 'John Lee',
      email: 'johnlee@gmail.com',
      password: bcrypt.hashSync('john123'),
      gender: 'Male',
      dateOfBirth: new Date('1985-08-10'),
      placeOfBirth: 'Seattle',
      mobileNo: '5553334444',
      residentialAddress: '456 Elm Street, Seattle',
      isAdmin: true,
    },
    {
      name: 'Emily Chen',
      email: 'emilychen@gmail.com',
      password: bcrypt.hashSync('emily123'),
      gender: 'Female',
      dateOfBirth: new Date('1988-12-02'),
      placeOfBirth: 'New York',
      mobileNo: '5555555555',
      residentialAddress: '789 Oak Street, New York',
      isAdmin: true,
    },
    {
      name: 'David Kim',
      email: 'davidkim2@gmail.com',
      password: bcrypt.hashSync('david123'),
      gender: 'Male',
      dateOfBirth: new Date('1982-06-15'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '5557778888',
      residentialAddress: '321 Pine Street, Los Angeles',
      isAdmin: true,
    },
    {
      name: 'David Kim',
      email: 'davidkim@gmail.com',
      password: bcrypt.hashSync('david123'),
      gender: 'Male',
      dateOfBirth: new Date('1982-06-15'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '5557778888',
      residentialAddress: '321 Pine Street, Los Angeles',
      isAdmin: true,
    },
  ],
};

export const studentLinks = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'home',
        icon: <AiFillHome />,
      },
    ],
  },

  {
    title: 'Pages',
    links: [
      {
        name: 'enrollment',
        icon: <AiFillIdcard />,
      },
      {
        name: 'tuition',
        icon: <FaMoneyBillAlt />,
      },
      {
        name: 'schedules',
        icon: <AiFillCalendar />,
      },
      {
        name: 'grades',
        icon: <TbReportAnalytics />,
      },
      {
        name: 'scores',
        icon: <AiFillSnippets />,
      },
      {
        name: 'forms',
        icon: <AiFillDiff />,
      },
      {
        name: 'hdf',
        icon: <RiContactsLine />,
      },
    ],
  },
];
