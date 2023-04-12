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
      _id: '609e16f7c2585b8a5f9ddc01',
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
      _id: '609e16f7c2585b8a5f9ddc02',
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
      _id: '609e16f7c2585b8a5f9ddc03',
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
      _id: '609e16f7c2585b8a5f9ddc04',
      name: 'Sarah Smith',
      email: 'teacher@gmail.com',
      password: bcrypt.hashSync('teacher123'),
      gender: 'Female',
      dateOfBirth: new Date('1990-03-25'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5551112222',
      residentialAddress: '123 Main Street, San Francisco',
      isAdmin: true,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc05',
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
      _id: '609e16f7c2585b8a5f9ddc06',
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
      _id: '609e16f7c2585b8a5f9ddc07',
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
  ],
  criteria: [
    {
      _id: '609e16f7c2585b8a5f9ddc24',
      name: 'CRIT-001',
      teacher_id: '609e16f7c2585b8a5f9ddc04',
      criteria: {
        lecture: {
          short_quiz: {
            weightage: 0.2,
            description: 'Short quizzes administered during lecture',
          },
          seatwork: {
            weightage: 0.15,
            description: 'In-class assignments and exercises',
          },
          long_quiz: {
            weightage: 0.25,
            description: 'Longer quizzes and tests administered during lecture',
          },
          examination: {
            weightage: 0.4,
            description: 'Comprehensive final exam',
          },
        },
        laboratory: {
          lab_exercises: {
            weightage: 0.4,
            description: 'In-class lab exercises and experiments',
          },
          project: {
            weightage: 0.35,
            description: 'Final project or research paper',
          },
          practical_exam: {
            weightage: 0.25,
            description: 'Practical exams or demonstrations',
          },
        },
        percentage: {
          lecture: 0.7,
          laboratory: 0.3,
        },
      },
    },
    {
      _id: '609e16f7c2585b8a5f9ddc58',
      name: 'CRIT-002',
      teacher_id: '609e16f7c2585b8a5f9ddc04',
      criteria: {
        lecture: {
          short_quiz: {
            weightage: 0.2,
            description: 'Short quizzes administered during lecture',
          },
          seatwork: {
            weightage: 0.15,
            description: 'In-class assignments and exercises',
          },
          long_quiz: {
            weightage: 0.25,
            description: 'Longer quizzes and tests administered during lecture',
          },
          examination: {
            weightage: 0.4,
            description: 'Comprehensive final exam',
          },
        },
        laboratory: {
          lab_exercises: {
            weightage: 0.4,
            description: 'In-class lab exercises and experiments',
          },
          project: {
            weightage: 0.35,
            description: 'Final project or research paper',
          },
          practical_exam: {
            weightage: 0.25,
            description: 'Practical exams or demonstrations',
          },
        },
        percentage: {
          lecture: 0.6,
          laboratory: 0.2,
        },
      },
    },
  ],
  course: [
    {
      _id: '606c80b0a6d0e64b130e6f01',
      name: 'Bachelor Science in Information Technology',
      description:
        'This program provides students with a strong foundation in programming, database management, networking, and web development. Graduates are prepared for a variety of careers in the tech industry.',
    },
    {
      _id: '606c80b0a6d0e64b130e6f02',
      name: 'Bachelor of Science in Business Administration',
      description:
        'This program is designed to equip students with the knowledge and skills needed to succeed in the dynamic field of business. Students will gain a solid understanding of business principles, finance, marketing, and management.',
    },
    {
      _id: '606c80b0a6d0e64b130e6f03',
      name: 'Bachelor of Arts in Psychology',
      description:
        'This program focuses on the scientific study of human behavior and mental processes. Students will explore a range of topics, including personality, perception, learning, and social psychology.',
    },
    {
      _id: '606c80b0a6d0e64b130e6f04',
      name: 'Bachelor of Fine Arts in Graphic Design',
      description:
        'This program is ideal for students who are passionate about art and design. Students will develop their skills in typography, branding, digital media, and print design, and will have opportunities to create their own portfolio of work.',
    },
    {
      _id: '606c80b0a6d0e64b130e6f05',
      name: 'Bachelor of Science in Nursing',
      description:
        'This program prepares students for a career as a registered nurse. Students will learn about anatomy, physiology, pharmacology, and patient care, and will have the opportunity to gain practical experience through clinical rotations.',
    },
  ],
  class: [
    {
      _id: '60971b780eaf050004123456',
      course_id: '606c80b0a6d0e64b130e6f05',
      name: 'BSIT',
      year: 3,
      section: 1,
      batch: '2022',
      student_id: ['609e16f7c2585b8a5f9ddc01'],
    },
    {
      _id: '60971b780eaf050004123457',
      course_id: '606c80b0a6d0e64b130e6f04',
      name: 'BFA',
      year: 4,
      section: 2,
      batch: '2023',
      student_id: ['609e16f7c2585b8a5f9ddc02'],
    },
    {
      _id: '60971b780eaf050004123458',
      course_id: '606c80b0a6d0e64b130e6f05',
      name: 'BSIT',
      year: 3,
      section: 1,
      batch: '2023',
      student_id: ['609e16f7c2585b8a5f9ddc03'],
    },
  ],

  subject: [
    {
      _id: '609f42e6c2585b8a5f9ddc07',
      name: 'Introduction to Computer Science',
      description:
        'This course provides an introduction to the fundamental concepts of computer science and programming.',
      semester: 1,
      class_id: '60971b780eaf050004123456',
      teacher_id: '609e16f7c2585b8a5f9ddc04',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8a5f9ddc12',
      name: 'Introduction to Computer Science',
      description:
        'This course provides an introduction to the fundamental concepts of computer science and programming.',
      semester: 1,
      class_id: '60971b780eaf050004123457',
      teacher_id: '609e16f7c2585b8a5f9ddc04',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
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

export const teacherLinks = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'home',
        href: 'home',
        icon: <AiFillHome />,
      },
    ],
  },

  {
    title: 'Pages',
    links: [
      {
        name: 'criteria',
        href: 'criteria',
        icon: <AiFillIdcard />,
      },
      {
        name: 'subject setup',
        href: 'subject-setup',
        icon: <AiFillDiff />,
      },
      {
        name: 'section setup',
        href: 'section-setup',
        icon: <AiFillDiff />,
      },
      {
        name: 'section',
        href: 'section',
        icon: <FaMoneyBillAlt />,
      },
      {
        name: 'performance',
        href: 'performance',
        icon: <AiFillCalendar />,
      },
      {
        name: 'attendance',
        href: 'attendance',
        icon: <TbReportAnalytics />,
      },
      {
        name: 'students grade',
        href: 'students-grade',
        icon: <AiFillSnippets />,
      },

      // {
      //   name: 'hdf',
      //   icon: <RiContactsLine />,
      // },
    ],
  },
];

export const baseUrl = process.env.NEXTAUTH_URL
  ? process.env.NEXTAUTH_URL
  : 'http://localhost:3000';
