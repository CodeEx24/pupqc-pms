import bcrypt from 'bcryptjs';

import {
  AiFillHome,
  AiFillIdcard,
  AiFillCalendar,
  AiFillSnippets,
  AiFillDiff,
} from 'react-icons/ai';

import { TbReportAnalytics } from 'react-icons/tb';
import { FaUser } from 'react-icons/fa';

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
      {
        name: 'subject',
        href: 'subject',
        icon: <TbReportAnalytics />,
      },
      {
        name: 'criteria',
        href: 'criteria',
        icon: <TbReportAnalytics />,
      },
      {
        name: 'classes',
        href: 'classes',
        icon: <AiFillDiff />,
      },
      {
        name: 'manage class',
        href: 'manage-class',
        icon: <TbReportAnalytics />,
      },
      {
        name: 'teacher list',
        href: 'teacher-list',
        icon: <TbReportAnalytics />,
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
        icon: <TbReportAnalytics />,
      },
      {
        name: 'class subject',
        href: 'class-subject',
        icon: <TbReportAnalytics />,
      },
    ],
  },

  // {
  //   title: 'Pages',
  //   links: [
  //     {
  //       name: 'enrollment',
  //       icon: <AiFillIdcard />,
  //     },
  //     {
  //       name: 'tuition',
  //       icon: <FaMoneyBillAlt />,
  //     },
  //     {
  //       name: 'schedules',
  //       icon: <AiFillCalendar />,
  //     },

  //     {
  //       name: 'scores',
  //       icon: <AiFillSnippets />,
  //     },
  //     {
  //       name: 'forms',
  //       icon: <AiFillDiff />,
  //     },
  //     {
  //       name: 'hdf',
  //       icon: <RiContactsLine />,
  //     },
  //   ],
  // },
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
        name: 'subject',
        href: 'subject',
        icon: <AiFillIdcard />,
      },
      {
        name: 'class subject',
        href: 'class-subject',
        icon: <AiFillDiff />,
      },
      {
        name: 'student list',
        href: 'student-list',
        icon: <AiFillDiff />,
      },
      {
        name: 'performance',
        href: 'performance',
        icon: <AiFillCalendar />,
      },
      {
        name: 'grades',
        href: 'grades',
        icon: <AiFillSnippets />,
      },

      {
        name: 'profile',
        href: 'profile',
        icon: <FaUser />,
      },
    ],
  },
];

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#38bdf8',
  },
  {
    name: 'green-theme',
    color: '#4ade80',
  },
  {
    name: 'purple-theme',
    color: '#c084fc',
  },
  {
    name: 'red-theme',
    color: '#f87171',
  },
  {
    name: 'indigo-theme',
    color: '#818cf8',
  },
  {
    name: 'orange-theme',
    color: '#fb923c',
  },
];

export const data = {
  students: [
    // TESTING DATA
    {
      _id: '609e16f7c2585b8a5f9ddc01',
      name: 'John Doe',
      email: 'student@gmail.com',
      password: bcrypt.hashSync('student123'),
      gender: 'Male',
      dateOfBirth: new Date('1995-05-01'),
      placeOfBirth: 'New York',
      mobileNo: '1234567890',
      residentialAddress: '123 Main Street, New York',
      isAdmin: 0,
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
      isAdmin: 0,
    },
    // END OF TESTING DATA
    {
      _id: '609e16f7c2585b8a5f9ddc11',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@gmail.com',
      password: bcrypt.hashSync('sarah123'),
      gender: 'Female',
      dateOfBirth: new Date('1996-08-10'),
      placeOfBirth: 'Chicago',
      mobileNo: '5559876543',
      residentialAddress: '789 Pine Street, Chicago',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc12',
      name: 'David Lee',
      email: 'david.lee@yahoo.com',
      password: bcrypt.hashSync('david456'),
      gender: 'Male',
      dateOfBirth: new Date('1999-01-20'),
      placeOfBirth: 'San Francisco',
      mobileNo: '8765432198',
      residentialAddress: '123 Oak Street, San Francisco',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc13',
      name: 'Emily Smith',
      email: 'emily.smith@hotmail.com',
      password: bcrypt.hashSync('emily789'),
      gender: 'Female',
      dateOfBirth: new Date('1995-04-05'),
      placeOfBirth: 'Houston',
      mobileNo: '3456789123',
      residentialAddress: '567 Pine Street, Houston',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc14',
      name: 'Michael Johnson',
      email: 'michael.johnson@gmail.com',
      password: bcrypt.hashSync('michael123'),
      gender: 'Male',
      dateOfBirth: new Date('1993-09-18'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '9876543120',
      residentialAddress: '789 Elm Street, Los Angeles',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc15',
      name: 'Olivia Brown',
      email: 'olivia.brown@gmail.com',
      password: bcrypt.hashSync('olivia456'),
      gender: 'Female',
      dateOfBirth: new Date('1997-12-03'),
      placeOfBirth: 'New York',
      mobileNo: '1234567980',
      residentialAddress: '123 Maple Street, New York',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc16',
      name: 'Daniel Wilson',
      email: 'daniel.wilson@gmail.com',
      password: bcrypt.hashSync('daniel789'),
      gender: 'Male',
      dateOfBirth: new Date('1994-05-15'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5559876432',
      residentialAddress: '456 Oak Street, San Francisco',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc17',
      name: 'Sophia Davis',
      email: 'sophia.davis@yahoo.com',
      password: bcrypt.hashSync('sophia123'),
      gender: 'Female',
      dateOfBirth: new Date('1999-02-28'),
      placeOfBirth: 'Chicago',
      mobileNo: '8765432197',
      residentialAddress: '789 Elm Street, Chicago',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc18',
      name: 'James Anderson',
      email: 'james.anderson@hotmail.com',
      password: bcrypt.hashSync('james456'),
      gender: 'Male',
      dateOfBirth: new Date('1998-07-02'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '3456789126',
      residentialAddress: '123 Pine Street, Los Angeles',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc19',
      name: 'Emma Taylor',
      email: 'emma.taylor@gmail.com',
      password: bcrypt.hashSync('emma789'),
      gender: 'Female',
      dateOfBirth: new Date('1996-11-20'),
      placeOfBirth: 'Houston',
      mobileNo: '9876543125',
      residentialAddress: '456 Oak Street, Houston',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc20',
      name: 'Noah Clark',
      email: 'noah.clark@yahoo.com',
      password: bcrypt.hashSync('noah123'),
      gender: 'Male',
      dateOfBirth: new Date('1995-03-10'),
      placeOfBirth: 'New York',
      mobileNo: '1234567984',
      residentialAddress: '789 Elm Street, New York',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc21',
      name: 'Ava Allen',
      email: 'ava.allen@hotmail.com',
      password: bcrypt.hashSync('ava456'),
      gender: 'Female',
      dateOfBirth: new Date('1997-05-25'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5559876436',
      residentialAddress: '123 Pine Street, San Francisco',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc22',
      name: 'William Turner',
      email: 'william.turner@gmail.com',
      password: bcrypt.hashSync('william789'),
      gender: 'Male',
      dateOfBirth: new Date('1999-08-08'),
      placeOfBirth: 'Chicago',
      mobileNo: '8765432194',
      residentialAddress: '456 Elm Street, Chicago',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc23',
      name: 'Isabella Martin',
      email: 'isabella.martin@yahoo.com',
      password: bcrypt.hashSync('isabella123'),
      gender: 'Female',
      dateOfBirth: new Date('1998-01-15'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '3456789128',
      residentialAddress: '789 Pine Street, Los Angeles',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc24',
      name: 'Benjamin Hill',
      email: 'benjamin.hill@hotmail.com',
      password: bcrypt.hashSync('benjamin456'),
      gender: 'Male',
      dateOfBirth: new Date('1996-04-30'),
      placeOfBirth: 'Houston',
      mobileNo: '9876543123',
      residentialAddress: '123 Oak Street, Houston',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc25',
      name: 'Charlotte Young',
      email: 'charlotte.young@gmail.com',
      password: bcrypt.hashSync('charlotte789'),
      gender: 'Female',
      dateOfBirth: new Date('1995-09-12'),
      placeOfBirth: 'New York',
      mobileNo: '1234567982',
      residentialAddress: '456 Elm Street, New York',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc26',
      name: 'Henry Turner',
      email: 'henry.turner@yahoo.com',
      password: bcrypt.hashSync('henry123'),
      gender: 'Male',
      dateOfBirth: new Date('1997-12-25'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5559876434',
      residentialAddress: '789 Pine Street, San Francisco',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc27',
      name: 'Amelia Garcia',
      email: 'amelia.garcia@hotmail.com',
      password: bcrypt.hashSync('amelia456'),
      gender: 'Female',
      dateOfBirth: new Date('1994-06-05'),
      placeOfBirth: 'Chicago',
      mobileNo: '8765432192',
      residentialAddress: '123 Oak Street, Chicago',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc28',
      name: 'Liam Allen',
      email: 'liam.allen@gmail.com',
      password: bcrypt.hashSync('liam789'),
      gender: 'Male',
      dateOfBirth: new Date('1999-09-18'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '3456789126',
      residentialAddress: '456 Elm Street, Los Angeles',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc29',
      name: 'Sophia Hill',
      email: 'sophia.hill@yahoo.com',
      password: bcrypt.hashSync('sophia123'),
      gender: 'Female',
      dateOfBirth: new Date('1998-02-28'),
      placeOfBirth: 'Houston',
      mobileNo: '9876543125',
      residentialAddress: '789 Pine Street, Houston',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc30',
      name: 'Mason Young',
      email: 'mason.young@gmail.com',
      password: bcrypt.hashSync('mason456'),
      gender: 'Male',
      dateOfBirth: new Date('1997-05-10'),
      placeOfBirth: 'New York',
      mobileNo: '1234567984',
      residentialAddress: '123 Elm Street, New York',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc31',
      name: 'Amelia Davis',
      email: 'amelia.davis@hotmail.com',
      password: bcrypt.hashSync('amelia789'),
      gender: 'Female',
      dateOfBirth: new Date('1996-08-25'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5559876436',
      residentialAddress: '456 Pine Street, San Francisco',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc32',
      name: 'Lucas Turner',
      email: 'lucas.turner@gmail.com',
      password: bcrypt.hashSync('lucas123'),
      gender: 'Male',
      dateOfBirth: new Date('1995-01-08'),
      placeOfBirth: 'Chicago',
      mobileNo: '8765432194',
      residentialAddress: '789 Oak Street, Chicago',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc33',
      name: 'Mia Lopez',
      email: 'mia.lopez@yahoo.com',
      password: bcrypt.hashSync('mia456'),
      gender: 'Female',
      dateOfBirth: new Date('1999-04-15'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '3456789123',
      residentialAddress: '123 Elm Street, Los Angeles',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc34',
      name: 'Ethan Green',
      email: 'ethan.green@gmail.com',
      password: bcrypt.hashSync('ethan789'),
      gender: 'Male',
      dateOfBirth: new Date('1994-07-30'),
      placeOfBirth: 'Houston',
      mobileNo: '9876543120',
      residentialAddress: '456 Pine Street, Houston',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc35',
      name: 'Harper Lewis',
      email: 'harper.lewis@hotmail.com',
      password: bcrypt.hashSync('harper123'),
      gender: 'Female',
      dateOfBirth: new Date('1997-10-12'),
      placeOfBirth: 'New York',
      mobileNo: '1234567980',
      residentialAddress: '789 Oak Street, New York',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc36',
      name: 'Alexander Walker',
      email: 'alexander.walker@gmail.com',
      password: bcrypt.hashSync('alexander456'),
      gender: 'Male',
      dateOfBirth: new Date('1996-03-25'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5559876432',
      residentialAddress: '123 Pine Street, San Francisco',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc37',
      name: 'Aria Robinson',
      email: 'aria.robinson@yahoo.com',
      password: bcrypt.hashSync('aria789'),
      gender: 'Female',
      dateOfBirth: new Date('1998-06-05'),
      placeOfBirth: 'Chicago',
      mobileNo: '8765432197',
      residentialAddress: '456 Elm Street, Chicago',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc38',
      name: 'Sebastian Martinez',
      email: 'sebastian.martinez@hotmail.com',
      password: bcrypt.hashSync('sebastian123'),
      gender: 'Male',
      dateOfBirth: new Date('1995-09-18'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '3456789126',
      residentialAddress: '789 Pine Street, Los Angeles',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc39',
      name: 'Evelyn Garcia',
      email: 'evelyn.garcia@gmail.com',
      password: bcrypt.hashSync('evelyn789'),
      gender: 'Female',
      dateOfBirth: new Date('1996-12-28'),
      placeOfBirth: 'Houston',
      mobileNo: '9876543125',
      residentialAddress: '123 Oak Street, Houston',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc40',
      name: 'Daniel Wilson',
      email: 'daniel.wilson@yahoo.com',
      password: bcrypt.hashSync('daniel123'),
      gender: 'Male',
      dateOfBirth: new Date('1997-05-10'),
      placeOfBirth: 'New York',
      mobileNo: '1234567984',
      residentialAddress: '456 Elm Street, New York',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc41',
      name: 'Scarlett Martinez',
      email: 'scarlett.martinez@hotmail.com',
      password: bcrypt.hashSync('scarlett456'),
      gender: 'Female',
      dateOfBirth: new Date('1998-08-23'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5559876436',
      residentialAddress: '789 Pine Street, San Francisco',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc42',
      name: 'Joseph Lopez',
      email: 'joseph.lopez@gmail.com',
      password: bcrypt.hashSync('joseph789'),
      gender: 'Male',
      dateOfBirth: new Date('1999-01-05'),
      placeOfBirth: 'Chicago',
      mobileNo: '8765432194',
      residentialAddress: '123 Oak Street, Chicago',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc43',
      name: 'Victoria Rodriguez',
      email: 'victoria.rodriguez@yahoo.com',
      password: bcrypt.hashSync('victoria123'),
      gender: 'Female',
      dateOfBirth: new Date('1996-04-15'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '3456789128',
      residentialAddress: '456 Pine Street, Los Angeles',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc44',
      name: 'Christopher Hall',
      email: 'christopher.hall@hotmail.com',
      password: bcrypt.hashSync('christopher456'),
      gender: 'Male',
      dateOfBirth: new Date('1995-07-30'),
      placeOfBirth: 'Houston',
      mobileNo: '9876543123',
      residentialAddress: '789 Oak Street, Houston',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc45',
      name: 'Penelope Wright',
      email: 'penelope.wright@gmail.com',
      password: bcrypt.hashSync('penelope789'),
      gender: 'Female',
      dateOfBirth: new Date('1994-11-12'),
      placeOfBirth: 'New York',
      mobileNo: '1234567982',
      residentialAddress: '123 Elm Street, New York',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc46',
      name: 'Jack Green',
      email: 'jack.green@yahoo.com',
      password: bcrypt.hashSync('jack123'),
      gender: 'Male',
      dateOfBirth: new Date('1997-02-25'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5559876434',
      residentialAddress: '456 Pine Street, San Francisco',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc47',
      name: 'Aurora Taylor',
      email: 'aurora.taylor@hotmail.com',
      password: bcrypt.hashSync('aurora456'),
      gender: 'Female',
      dateOfBirth: new Date('1998-05-07'),
      placeOfBirth: 'Chicago',
      mobileNo: '8765432192',
      residentialAddress: '789 Oak Street, Chicago',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc48',
      name: 'Owen Allen',
      email: 'owen.allen@gmail.com',
      password: bcrypt.hashSync('owen789'),
      gender: 'Male',
      dateOfBirth: new Date('1999-08-19'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '3456789126',
      residentialAddress: '123 Pine Street, Los Angeles',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc49',
      name: 'Luna Walker',
      email: 'luna.walker@yahoo.com',
      password: bcrypt.hashSync('luna123'),
      gender: 'Female',
      dateOfBirth: new Date('1996-11-01'),
      placeOfBirth: 'Houston',
      mobileNo: '9876543125',
      residentialAddress: '456 Elm Street, Houston',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc50',
      name: 'Carter Davis',
      email: 'carter.davis@gmail.com',
      password: bcrypt.hashSync('carter456'),
      gender: 'Male',
      dateOfBirth: new Date('1995-02-12'),
      placeOfBirth: 'New York',
      mobileNo: '1234567984',
      residentialAddress: '789 Oak Street, New York',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc51',
      name: 'Scarlett Turner',
      email: 'scarlett.turner@hotmail.com',
      password: bcrypt.hashSync('scarlett789'),
      gender: 'Female',
      dateOfBirth: new Date('1994-05-25'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5559876436',
      residentialAddress: '123 Pine Street, San Francisco',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc52',
      name: 'Asher Robinson',
      email: 'asher.robinson@yahoo.com',
      password: bcrypt.hashSync('asher123'),
      gender: 'Male',
      dateOfBirth: new Date('1997-08-07'),
      placeOfBirth: 'Chicago',
      mobileNo: '8765432193',
      residentialAddress: '456 Elm Street, Chicago',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc53',
      name: 'Madison Martinez',
      email: 'madison.martinez@gmail.com',
      password: bcrypt.hashSync('madison789'),
      gender: 'Female',
      dateOfBirth: new Date('1998-11-19'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '3456789129',
      residentialAddress: '789 Pine Street, Los Angeles',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc54',
      name: 'Henry Lopez',
      email: 'henry.lopez@hotmail.com',
      password: bcrypt.hashSync('henry123'),
      gender: 'Male',
      dateOfBirth: new Date('1995-02-01'),
      placeOfBirth: 'Houston',
      mobileNo: '9876543127',
      residentialAddress: '123 Oak Street, Houston',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc55',
      name: 'Ella Rodriguez',
      email: 'ella.rodriguez@yahoo.com',
      password: bcrypt.hashSync('ella456'),
      gender: 'Female',
      dateOfBirth: new Date('1996-05-14'),
      placeOfBirth: 'New York',
      mobileNo: '1234567980',
      residentialAddress: '456 Elm Street, New York',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc56',
      name: 'Grayson Hall',
      email: 'grayson.hall@gmail.com',
      password: bcrypt.hashSync('grayson789'),
      gender: 'Male',
      dateOfBirth: new Date('1997-08-26'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5559876431',
      residentialAddress: '789 Pine Street, San Francisco',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc57',
      name: 'Stella Wright',
      email: 'stella.wright@hotmail.com',
      password: bcrypt.hashSync('stella123'),
      gender: 'Female',
      dateOfBirth: new Date('1998-12-07'),
      placeOfBirth: 'Chicago',
      mobileNo: '8765432197',
      residentialAddress: '123 Oak Street, Chicago',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc58',
      name: 'Leo Allen',
      email: 'leo.allen@gmail.com',
      password: bcrypt.hashSync('leo789'),
      gender: 'Male',
      dateOfBirth: new Date('1999-03-20'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '3456789125',
      residentialAddress: '456 Pine Street, Los Angeles',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc59',
      name: 'Lily Walker',
      email: 'lily.walker@yahoo.com',
      password: bcrypt.hashSync('lily123'),
      gender: 'Female',
      dateOfBirth: new Date('1996-06-02'),
      placeOfBirth: 'Houston',
      mobileNo: '9876543124',
      residentialAddress: '789 Oak Street, Houston',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc60',
      name: 'Oliver Davis',
      email: 'oliver.davis@gmail.com',
      password: bcrypt.hashSync('oliver456'),
      gender: 'Male',
      dateOfBirth: new Date('1995-09-15'),
      placeOfBirth: 'New York',
      mobileNo: '1234567983',
      residentialAddress: '123 Elm Street, New York',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc61',
      name: 'Ava Turner',
      email: 'ava.turner@hotmail.com',
      password: bcrypt.hashSync('ava789'),
      gender: 'Female',
      dateOfBirth: new Date('1994-12-28'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5559876435',
      residentialAddress: '456 Pine Street, San Francisco',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc62',
      name: 'Ethan Robinson',
      email: 'ethan.robinson@yahoo.com',
      password: bcrypt.hashSync('ethan123'),
      gender: 'Male',
      dateOfBirth: new Date('1997-04-10'),
      placeOfBirth: 'Chicago',
      mobileNo: '8765432195',
      residentialAddress: '789 Oak Street, Chicago',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc63',
      name: 'Mia Martinez',
      email: 'mia.martinez@gmail.com',
      password: bcrypt.hashSync('mia789'),
      gender: 'Female',
      dateOfBirth: new Date('1998-07-23'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '3456789127',
      residentialAddress: '123 Pine Street, Los Angeles',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc64',
      name: 'Noah Lopez',
      email: 'noah.lopez@hotmail.com',
      password: bcrypt.hashSync('noah123'),
      gender: 'Male',
      dateOfBirth: new Date('1995-10-04'),
      placeOfBirth: 'Houston',
      mobileNo: '9876543126',
      residentialAddress: '456 Elm Street, Houston',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc65',
      name: 'Sophia Rodriguez',
      email: 'sophia.rodriguez@yahoo.com',
      password: bcrypt.hashSync('sophia456'),
      gender: 'Female',
      dateOfBirth: new Date('1996-01-16'),
      placeOfBirth: 'New York',
      mobileNo: '1234567981',
      residentialAddress: '789 Oak Street, New York',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc66',
      name: 'William Hall',
      email: 'william.hall@gmail.com',
      password: bcrypt.hashSync('william789'),
      gender: 'Male',
      dateOfBirth: new Date('1997-04-29'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5559876433',
      residentialAddress: '123 Pine Street, San Francisco',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc67',
      name: 'Abigail Wright',
      email: 'abigail.wright@hotmail.com',
      password: bcrypt.hashSync('abigail123'),
      gender: 'Female',
      dateOfBirth: new Date('1998-08-11'),
      placeOfBirth: 'Chicago',
      mobileNo: '8765432194',
      residentialAddress: '456 Elm Street, Chicago',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc68',
      name: 'James Allen',
      email: 'james.allen@gmail.com',
      password: bcrypt.hashSync('james789'),
      gender: 'Male',
      dateOfBirth: new Date('1999-11-23'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '3456789128',
      residentialAddress: '789 Pine Street, Los Angeles',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc69',
      name: 'Charlotte Walker',
      email: 'charlotte.walker@yahoo.com',
      password: bcrypt.hashSync('charlotte123'),
      gender: 'Female',
      dateOfBirth: new Date('1996-02-05'),
      placeOfBirth: 'Houston',
      mobileNo: '9876543123',
      residentialAddress: '123 Oak Street, Houston',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc70',
      name: 'Daniel Davis',
      email: 'daniel.davis@gmail.com',
      password: bcrypt.hashSync('daniel456'),
      gender: 'Male',
      dateOfBirth: new Date('1995-05-18'),
      placeOfBirth: 'New York',
      mobileNo: '1234567985',
      residentialAddress: '456 Elm Street, New York',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc71',
      name: 'Harper Turner',
      email: 'harper.turner@hotmail.com',
      password: bcrypt.hashSync('harper789'),
      gender: 'Female',
      dateOfBirth: new Date('1994-08-31'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5559876432',
      residentialAddress: '789 Pine Street, San Francisco',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc72',
      name: 'Logan Robinson',
      email: 'logan.robinson@yahoo.com',
      password: bcrypt.hashSync('logan123'),
      gender: 'Male',
      dateOfBirth: new Date('1997-12-12'),
      placeOfBirth: 'Chicago',
      mobileNo: '8765432192',
      residentialAddress: '123 Oak Street, Chicago',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc73',
      name: 'Emily Martinez',
      email: 'emily.martinez@gmail.com',
      password: bcrypt.hashSync('emily789'),
      gender: 'Female',
      dateOfBirth: new Date('1998-03-25'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '3456789126',
      residentialAddress: '456 Pine Street, Los Angeles',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc74',
      name: 'Benjamin Lopez',
      email: 'benjamin.lopez@hotmail.com',
      password: bcrypt.hashSync('benjamin123'),
      gender: 'Male',
      dateOfBirth: new Date('1995-07-07'),
      placeOfBirth: 'Houston',
      mobileNo: '9876543122',
      residentialAddress: '789 Elm Street, Houston',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc75',
      name: 'Scarlett Rodriguez',
      email: 'scarlett.rodriguez@yahoo.com',
      password: bcrypt.hashSync('scarlett456'),
      gender: 'Female',
      dateOfBirth: new Date('1996-10-20'),
      placeOfBirth: 'New York',
      mobileNo: '1234567984',
      residentialAddress: '123 Oak Street, New York',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc76',
      name: 'Michael Hall',
      email: 'michael.hall@gmail.com',
      password: bcrypt.hashSync('michael789'),
      gender: 'Male',
      dateOfBirth: new Date('1997-02-01'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5559876434',
      residentialAddress: '456 Pine Street, San Francisco',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc77',
      name: 'Victoria Wright',
      email: 'victoria.wright@hotmail.com',
      password: bcrypt.hashSync('victoria123'),
      gender: 'Female',
      dateOfBirth: new Date('1998-05-15'),
      placeOfBirth: 'Chicago',
      mobileNo: '8765432191',
      residentialAddress: '789 Elm Street, Chicago',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc78',
      name: 'John Allen',
      email: 'john.allen@gmail.com',
      password: bcrypt.hashSync('john789'),
      gender: 'Male',
      dateOfBirth: new Date('1999-08-27'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '3456789127',
      residentialAddress: '123 Pine Street, Los Angeles',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc79',
      name: 'Sofia Walker',
      email: 'sofia.walker@yahoo.com',
      password: bcrypt.hashSync('sofia123'),
      gender: 'Female',
      dateOfBirth: new Date('1996-12-09'),
      placeOfBirth: 'Houston',
      mobileNo: '9876543121',
      residentialAddress: '456 Oak Street, Houston',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc80',
      name: 'Alexander Davis',
      email: 'alexander.davis@gmail.com',
      password: bcrypt.hashSync('alexander456'),
      gender: 'Male',
      dateOfBirth: new Date('1995-03-23'),
      placeOfBirth: 'New York',
      mobileNo: '1234567983',
      residentialAddress: '789 Elm Street, New York',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc81',
      name: 'Grace Turner',
      email: 'grace.turner@hotmail.com',
      password: bcrypt.hashSync('grace789'),
      gender: 'Female',
      dateOfBirth: new Date('1994-07-05'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5559876431',
      residentialAddress: '123 Pine Street, San Francisco',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc82',
      name: 'Ryan Robinson',
      email: 'ryan.robinson@yahoo.com',
      password: bcrypt.hashSync('ryan123'),
      gender: 'Male',
      dateOfBirth: new Date('1997-10-18'),
      placeOfBirth: 'Chicago',
      mobileNo: '8765432190',
      residentialAddress: '456 Oak Street, Chicago',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc83',
      name: 'Chloe Martinez',
      email: 'chloe.martinez@gmail.com',
      password: bcrypt.hashSync('chloe456'),
      gender: 'Female',
      dateOfBirth: new Date('1998-01-31'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '3456789129',
      residentialAddress: '789 Pine Street, Los Angeles',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc84',
      name: 'David Lopez',
      email: 'david.lopez@hotmail.com',
      password: bcrypt.hashSync('david789'),
      gender: 'Male',
      dateOfBirth: new Date('1995-05-14'),
      placeOfBirth: 'Houston',
      mobileNo: '9876543120',
      residentialAddress: '123 Elm Street, Houston',
      isAdmin: 0,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc85',
      name: 'Zoe Rodriguez',
      email: 'zoe.rodriguez@yahoo.com',
      password: bcrypt.hashSync('zoe123'),
      gender: 'Female',
      dateOfBirth: new Date('1996-08-26'),
      placeOfBirth: 'New York',
      mobileNo: '1234567982',
      residentialAddress: '456 Pine Street, New York',
      isAdmin: 0,
    },
  ],

  teachers: [
    // TESTING DATA
    {
      _id: '609e16f7c2585b8a5f9ddc51',
      name: 'Jocarl Basco',
      email: 'teacher@gmail.com',
      password: bcrypt.hashSync('teacher123'),
      gender: 'Female',
      dateOfBirth: new Date('1990-03-25'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5551112222',
      residentialAddress: '123 Main Street, San Francisco',
      isActive: true,
      isAdmin: 1,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc52',
      name: 'Jocarl Basco',
      email: 'jocarlbasco24@gmail.com',
      password: bcrypt.hashSync('john123'),
      gender: 'Male',
      dateOfBirth: new Date('1985-08-10'),
      placeOfBirth: 'Seattle',
      mobileNo: '5553334444',
      residentialAddress: '456 Elm Street, Seattle',
      isActive: false,
      isAdmin: 1,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc81',
      name: 'David Ymor Illustre',
      email: 'david.ilustre@gmail.com',
      password: bcrypt.hashSync('david123'),
      gender: 'Male',
      dateOfBirth: new Date('1982-06-15'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '5557778888',
      residentialAddress: '321 Pine Street, Los Angeles',
      isActive: true,
      isAdmin: 1,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc82',
      name: 'Eugene Privaldos',
      email: 'eugene.privaldos.9@gmail.com',
      password: bcrypt.hashSync('eugene123'),
      gender: 'Female',
      dateOfBirth: new Date('1990-03-25'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5551112222',
      residentialAddress: '123 Main Street, San Francisco',
      isActive: true,
      isAdmin: 1,
    },
    // END OF TESTING DATA

    {
      _id: '609e16f7c2585b8a5f9dd001',
      name: 'Liam Wilson',
      email: 'liam.wilson@gmail.com',
      password: bcrypt.hashSync('liam123'),
      gender: 'Male',
      dateOfBirth: new Date('1986-05-08'),
      placeOfBirth: 'San Francisco',
      mobileNo: '9876543210',
      residentialAddress: '456 Elm Street, San Francisco',
      isActive: false,
      isAdmin: 1,
    },
    {
      _id: '609e16f7c2585b8a5f9dd002',
      name: 'Charlotte Thompson',
      email: 'charlotte.thompson@yahoo.com',
      password: bcrypt.hashSync('charlotte123'),
      gender: 'Female',
      dateOfBirth: new Date('1989-02-16'),
      placeOfBirth: 'Houston',
      mobileNo: '8765432109',
      residentialAddress: '123 Pine Street, Houston',
      isActive: false,
      isAdmin: 1,
    },
    {
      _id: '609e16f7c2585b8a5f9dd003',
      name: 'Ethan Rodriguez',
      email: 'ethan.rodriguez@hotmail.com',
      password: bcrypt.hashSync('ethan123'),
      gender: 'Male',
      dateOfBirth: new Date('1987-09-22'),
      placeOfBirth: 'New York',
      mobileNo: '1234567890',
      residentialAddress: '789 Oak Street, New York',
      isActive: false,
      isAdmin: 1,
    },
    {
      _id: '609e16f7c2585b8a5f9dd004',
      name: 'Isabella Martinez',
      email: 'isabella.martinez@gmail.com',
      password: bcrypt.hashSync('isabella123'),
      gender: 'Female',
      dateOfBirth: new Date('1984-06-03'),
      placeOfBirth: 'Chicago',
      mobileNo: '5551234567',
      residentialAddress: '456 Elm Street, Chicago',
      isActive: false,
      isAdmin: 1,
    },
    {
      _id: '609e16f7c2585b8a5f9dd005',
      name: 'Mason Adams',
      email: 'mason.adams@yahoo.com',
      password: bcrypt.hashSync('mason123'),
      gender: 'Male',
      dateOfBirth: new Date('1983-03-17'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '9876543210',
      residentialAddress: '123 Pine Street, Los Angeles',
      isActive: false,
      isAdmin: 1,
    },
    {
      _id: '609e16f7c2585b8a5f9dd006',
      name: 'Mia Davis',
      email: 'mia.davis@hotmail.com',
      password: bcrypt.hashSync('mia123'),
      gender: 'Female',
      dateOfBirth: new Date('1990-10-12'),
      placeOfBirth: 'San Francisco',
      mobileNo: '8765432109',
      residentialAddress: '789 Elm Street, San Francisco',
      isActive: true,
      isAdmin: 1,
    },
    {
      _id: '609e16f7c2585b8a5f9dd007',
      name: 'Logan Wilson',
      email: 'logan.wilson@gmail.com',
      password: bcrypt.hashSync('logan123'),
      gender: 'Male',
      dateOfBirth: new Date('1987-07-08'),
      placeOfBirth: 'Houston',
      mobileNo: '1234567890',
      residentialAddress: '456 Oak Street, Houston',
      isActive: true,
      isAdmin: 1,
    },
    {
      _id: '609e16f7c2585b8a5f9dd008',
      name: 'Avery Thompson',
      email: 'avery.thompson@yahoo.com',
      password: bcrypt.hashSync('avery123'),
      gender: 'Female',
      dateOfBirth: new Date('1984-04-15'),
      placeOfBirth: 'New York',
      mobileNo: '5551234567',
      residentialAddress: '123 Pine Street, New York',
      isActive: true,
      isAdmin: 1,
    },
    {
      _id: '609e16f7c2585b8a5f9dd009',
      name: 'Carter Rodriguez',
      email: 'carter.rodriguez@hotmail.com',
      password: bcrypt.hashSync('carter123'),
      gender: 'Male',
      dateOfBirth: new Date('1989-01-22'),
      placeOfBirth: 'Chicago',
      mobileNo: '9876543210',
      residentialAddress: '789 Elm Street, Chicago',
      isActive: true,
      isAdmin: 1,
    },
    {
      _id: '609e16f7c2585b8a5f9dd010',
      name: 'Elizabeth Martinez',
      email: 'elizabeth.martinez@gmail.com',
      password: bcrypt.hashSync('elizabeth123'),
      gender: 'Female',
      dateOfBirth: new Date('1986-08-03'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '8765432109',
      residentialAddress: '123 Pine Street, Los Angeles',
      isActive: true,
      isAdmin: 1,
    },
    {
      _id: '609e16f7c2585b8a5f9dd011',
      name: 'Henry Adams',
      email: 'henry.adams@yahoo.com',
      password: bcrypt.hashSync('henry123'),
      gender: 'Male',
      dateOfBirth: new Date('1983-05-17'),
      placeOfBirth: 'San Francisco',
      mobileNo: '1234567890',
      residentialAddress: '789 Oak Street, San Francisco',
      isActive: true,
      isAdmin: 1,
    },
    {
      _id: '609e16f7c2585b8a5f9dd012',
      name: 'Ella Davis',
      email: 'ella.davis@hotmail.com',
      password: bcrypt.hashSync('ella123'),
      gender: 'Female',
      dateOfBirth: new Date('1990-02-12'),
      placeOfBirth: 'Houston',
      mobileNo: '5551234567',
      residentialAddress: '456 Elm Street, Houston',
      isActive: true,
      isAdmin: 1,
    },
  ],
  admins: [
    {
      _id: '609e16f7c2585b8a5f9aee01',
      name: 'Jocarl Basco',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('admin123'),
      gender: 'Female',
      dateOfBirth: new Date('1990-03-25'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5551112222',
      residentialAddress: '123 Main Street, San Francisco',
      isAdmin: 2,
    },
    {
      _id: '609e16f7c2585b8a5f9aee02',
      name: 'Jocarl Basco',
      email: 'jocarlbasco24@gmail.com',
      password: bcrypt.hashSync('admin123'),
      gender: 'Female',
      dateOfBirth: new Date('1990-03-25'),
      placeOfBirth: 'San Francisco',
      mobileNo: '5551112222',
      residentialAddress: '123 Main Street, San Francisco',
      isAdmin: 2,
    },
  ],
  criteria: [
    {
      _id: '609e16f7c2585b8a5f9dc001',
      name: 'CRIT-003',
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
          lecture: 0.8,
          laboratory: 0.2,
        },
      },
    },
    {
      _id: '609e16f7c2585b8a5f9dc002',
      name: 'CRIT-004',
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
          laboratory: 0.4,
        },
      },
    },
    {
      _id: '609e16f7c2585b8a5f9dc003',
      name: 'CRIT-005',
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
      _id: '609e16f7c2585b8a5f9dc004',
      name: 'CRIT-006',
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
          lecture: 0.5,
          laboratory: 0.5,
        },
      },
    },
    {
      _id: '609e16f7c2585b8a5f9dc005',
      name: 'CRIT-007',
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
          lecture: 0.4,
          laboratory: 0.6,
        },
      },
    },
  ],
  course: [
    {
      _id: '606c80b0a6d0e64b130e6f01',
      course_code: 'BSIT',
      name: 'Bachelor Science in Information Technology',
      description:
        'This program provides students with a strong foundation in programming, database management, networking, and web development. Graduates are prepared for a variety of careers in the tech industry.',
    },
    {
      _id: '606c80b0a6d0e64b130e6f02',
      course_code: 'BSBA',
      name: 'Bachelor of Science in Business Administration',
      description:
        'This program is designed to equip students with the knowledge and skills needed to succeed in the dynamic field of business. Students will gain a solid understanding of business principles, finance, marketing, and management.',
    },
    {
      _id: '606c80b0a6d0e64b130e6f03',
      course_code: 'BFAGD',
      name: 'Bachelor of Fine Arts in Graphic Design',
      description:
        'This program is ideal for students who are passionate about art and design. Students will develop their skills in typography, branding, digital media, and print design, and will have opportunities to create their own portfolio of work.',
    },
  ],
  class: [
    {
      _id: '60c635b580dae60004cdd001',
      course_id: '606c80b0a6d0e64b130e6f01',
      year: 1,
      section: 1,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc11',
        '609e16f7c2585b8a5f9ddc12',
        '609e16f7c2585b8a5f9ddc13',
      ],
    },
    {
      _id: '60c635b580dae60004cdd002',
      course_id: '606c80b0a6d0e64b130e6f01',
      year: 1,
      section: 2,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc17',
        '609e16f7c2585b8a5f9ddc18',
        '609e16f7c2585b8a5f9ddc19',
      ],
    },
    {
      _id: '60c635b580dae60004cdd003',
      course_id: '606c80b0a6d0e64b130e6f01',
      year: 1,
      section: 3,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc23',
        '609e16f7c2585b8a5f9ddc24',
        '609e16f7c2585b8a5f9ddc25',
      ],
    },
    {
      _id: '60c635b580dae60004cdd004',
      course_id: '606c80b0a6d0e64b130e6f01',
      year: 2,
      section: 1,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc29',
        '609e16f7c2585b8a5f9ddc30',
        '609e16f7c2585b8a5f9ddc31',
      ],
    },
    {
      _id: '60c635b580dae60004cdd005',
      course_id: '606c80b0a6d0e64b130e6f01',
      year: 2,
      section: 2,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc35',
        '609e16f7c2585b8a5f9ddc36',
        '609e16f7c2585b8a5f9ddc37',
      ],
    },
    {
      _id: '60c635b580dae60004cdd006',
      course_id: '606c80b0a6d0e64b130e6f01',
      year: 2,
      section: 3,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc41',
        '609e16f7c2585b8a5f9ddc42',
        '609e16f7c2585b8a5f9ddc43',
      ],
    },
    {
      _id: '60c635b580dae60004cdd007',
      course_id: '606c80b0a6d0e64b130e6f01',
      year: 3,
      section: 1,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc01',
        '609e16f7c2585b8a5f9ddc02',
        '609e16f7c2585b8a5f9ddc47',
        '609e16f7c2585b8a5f9ddc48',
        '609e16f7c2585b8a5f9ddc49',
      ],
    },
    {
      _id: '60c635b580dae60004cdd008',
      course_id: '606c80b0a6d0e64b130e6f01',
      year: 3,
      section: 2,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc53',
        '609e16f7c2585b8a5f9ddc54',
        '609e16f7c2585b8a5f9ddc55',
      ],
    },
    {
      _id: '60c635b580dae60004cdd009',
      course_id: '606c80b0a6d0e64b130e6f01',
      year: 4,
      section: 1,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc64',
        '609e16f7c2585b8a5f9ddc65',
        '609e16f7c2585b8a5f9ddc66',
      ],
    },
    {
      _id: '60c635b580dae60004cdd010',
      course_id: '606c80b0a6d0e64b130e6f01',
      year: 4,
      section: 2,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc70',
        '609e16f7c2585b8a5f9ddc71',
        '609e16f7c2585b8a5f9ddc72',
      ],
    },
    {
      _id: '60c635b580dae60004cdd011',
      course_id: '606c80b0a6d0e64b130e6f01',
      year: 4,
      section: 3,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc76',
        '609e16f7c2585b8a5f9ddc77',
        '609e16f7c2585b8a5f9ddc78',
      ],
    },
    {
      _id: '60c635b580dae60004cdd012',
      course_id: '606c80b0a6d0e64b130e6f02',
      year: 1,
      section: 1,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc14',
        '609e16f7c2585b8a5f9ddc15',
        '609e16f7c2585b8a5f9ddc16',
      ],
    },
    {
      _id: '60c635b580dae60004cdd013',
      course_id: '606c80b0a6d0e64b130e6f02',
      year: 1,
      section: 2,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc20',
        '609e16f7c2585b8a5f9ddc21',
        '609e16f7c2585b8a5f9ddc22',
      ],
    },
    {
      _id: '60c635b580dae60004cdd014',
      course_id: '606c80b0a6d0e64b130e6f02',
      year: 1,
      section: 3,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc26',
        '609e16f7c2585b8a5f9ddc27',
        '609e16f7c2585b8a5f9ddc28',
      ],
    },
    {
      _id: '60c635b580dae60004cdd015',
      course_id: '606c80b0a6d0e64b130e6f02',
      year: 2,
      section: 1,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc32',
        '609e16f7c2585b8a5f9ddc33',
        '609e16f7c2585b8a5f9ddc34',
      ],
    },
    {
      _id: '60c635b580dae60004cdd016',
      course_id: '606c80b0a6d0e64b130e6f02',
      year: 2,
      section: 2,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc38',
        '609e16f7c2585b8a5f9ddc39',
        '609e16f7c2585b8a5f9ddc40',
      ],
    },
    {
      _id: '60c635b580dae60004cdd017',
      course_id: '606c80b0a6d0e64b130e6f02',
      year: 2,
      section: 3,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc44',
        '609e16f7c2585b8a5f9ddc45',
        '609e16f7c2585b8a5f9ddc46',
      ],
    },
    {
      _id: '60c635b580dae60004cdd018',
      course_id: '606c80b0a6d0e64b130e6f02',
      year: 3,
      section: 1,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc50',
        '609e16f7c2585b8a5f9ddc51',
        '609e16f7c2585b8a5f9ddc52',
      ],
    },
    {
      _id: '60c635b580dae60004cdd019',
      course_id: '606c80b0a6d0e64b130e6f02',
      year: 3,
      section: 2,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc56',
        '609e16f7c2585b8a5f9ddc57',
        '609e16f7c2585b8a5f9ddc58',
      ],
    },
    {
      _id: '60c635b580dae60004cdd020',
      course_id: '606c80b0a6d0e64b130e6f02',
      year: 4,
      section: 1,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc67',
        '609e16f7c2585b8a5f9ddc68',
        '609e16f7c2585b8a5f9ddc69',
      ],
    },
    {
      _id: '60c635b580dae60004cdd021',
      course_id: '606c80b0a6d0e64b130e6f02',
      year: 4,
      section: 2,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc73',
        '609e16f7c2585b8a5f9ddc74',
        '609e16f7c2585b8a5f9ddc75',
      ],
    },
    {
      _id: '60c635b580dae60004cdd022',
      course_id: '606c80b0a6d0e64b130e6f02',
      year: 4,
      section: 3,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc79',
        '609e16f7c2585b8a5f9ddc80',
        '609e16f7c2585b8a5f9ddc81',
      ],
    },
  ],
  subject: [
    {
      _id: 'ITCS-032',
      name: 'Introduction to Computer Science',
      description:
        'This course provides an introduction to the fundamental concepts of computer science and programming.',
    },
    {
      _id: 'DSAA-033',
      name: 'Data Structures and Algorithms',
      description:
        'This course covers the fundamentals of data structures and algorithms, including arrays, linked lists, trees, graphs, sorting and searching algorithms, and their applications in problem-solving.',
    },
    {
      _id: 'OSYS-512',
      name: 'Operating Systems',
      description:
        'This course covers the design and implementation of operating systems, including process management, memory management, file systems, and device management.',
    },

    {
      _id: 'SENG-516',
      name: 'Software Engineering',
      description:
        'This course covers the principles and practices of software engineering, including requirements engineering, software design, coding, testing, and maintenance.',
    },

    {
      _id: 'AINT-623',
      name: 'Artificial Intelligence',
      description:
        'This course covers the fundamental concepts and techniques of artificial intelligence, including search algorithms, machine learning, natural language processing, and robotics.',
    },
    {
      _id: 'DBMS-732',
      name: 'Database Management Systems',
      description:
        'This course covers the design, implementation, and maintenance of database systems, including data models, relational algebra, SQL, and database security.',
    },
    {
      _id: 'NWKS-321',
      name: 'Computer Networks',
      description:
        'This course covers the fundamentals of computer networks, including network architecture, protocols, topologies, and network security.',
    },
    {
      _id: 'SYSP-443',
      name: 'System Programming',
      description:
        'This course covers the concepts and techniques of system programming, including process management, memory management, and system calls.',
    },
    {
      _id: 'WEBD-615',
      name: 'Web Development',
      description:
        'This course covers the principles and practices of web development, including HTML, CSS, JavaScript, and web frameworks.',
    },
    {
      _id: 'DSAI-721',
      name: 'Data Science and Analytics',
      description:
        'This course covers the concepts and techniques of data science and analytics, including data preprocessing, data visualization, and machine learning.',
    },
    {
      _id: 'CMPN-133',
      name: 'Computer Organization and Architecture',
      description:
        'This course covers the fundamentals of computer organization and architecture, including digital logic, assembly language, and computer arithmetic.',
    },
    {
      _id: 'SYSC-621',
      name: 'Real-Time and Embedded Systems',
      description:
        'This course covers the principles and practices of real-time and embedded systems, including scheduling algorithms, interrupts, and device drivers.',
    },
    {
      _id: 'PRGR-833',
      name: 'Programming Languages',
      description:
        'This course covers the fundamental concepts and paradigms of programming languages, including syntax, semantics, and type systems.',
    },
    {
      _id: 'PRJC-411',
      name: 'Software Project Management',
      description:
        'This course covers the principles and practices of software project management, including project planning, estimation, tracking, and risk management.',
    },
    {
      _id: 'SYSC-541',
      name: 'Digital Signal Processing',
      description:
        'This course covers the concepts and techniques of digital signal processing, including signal analysis, filtering, and transformation.',
    },
    {
      _id: 'MLBD-652',
      name: 'Machine Learning and Big Data',
      description:
        'This course covers the concepts and techniques of machine learning and big data, including classification, clustering, and data mining.',
    },
    {
      _id: 'INFO-511',
      name: 'Information Retrieval',
      description:
        'This course covers the principles and techniques of information retrieval, including search engines, indexing, and relevance ranking.',
    },
    {
      _id: 'SECY-711',
      name: 'Cybersecurity',
      description:
        'This course covers the principles and practices of cybersecurity, including threat analysis, network security, and cryptography.',
    },
    {
      _id: 'CMPN-622',
      name: 'Computer Graphics',
      description:
        'This course covers the fundamental concepts and techniques of computer graphics, including 2D and 3D graphics, rendering, and animation.',
    },
    {
      _id: 'MLBD-611',
      name: 'Data Mining',
      description:
        'This course covers the concepts and techniques of data mining, including classification, clustering, and association rule mining.',
    },
    {
      _id: 'INFO-621',
      name: 'Human-Computer Interaction',
      description:
        'This course covers the principles and practices of human-computer interaction, including user-centered design, usability testing, and interface design.',
    },
    {
      _id: 'EMBS-742',
      name: 'Biomedical Signal Processing',
      description:
        'This course covers the concepts and techniques of biomedical signal processing, including signal analysis, filtering, and feature extraction for applications in healthcare and medical research.',
    },
    {
      _id: 'GAME-531',
      name: 'Game Development',
      description:
        'This course covers the principles and practices of game development, including game design, graphics, physics, and artificial intelligence.',
    },
    {
      _id: 'IOTC-651',
      name: 'Internet of Things and Cloud Computing',
      description:
        'This course covers the concepts and techniques of Internet of Things (IoT) and cloud computing, including IoT architectures, sensor networks, cloud platforms, and IoT applications.',
    },
    {
      _id: 'ROBT-721',
      name: 'Robotics',
      description:
        'This course covers the principles and practices of robotics, including kinematics, dynamics, control, and applications in industrial, medical, and entertainment domains.',
    },
    {
      _id: 'CSCI-781',
      name: 'Computer Vision',
      description:
        'This course covers the concepts and techniques of computer vision, including image processing, pattern recognition, and machine learning for applications in robotics, autonomous systems, and visual analytics.',
    },
    {
      _id: 'NLPN-731',
      name: 'Natural Language Processing',
      description:
        'This course covers the concepts and techniques of natural language processing, including text analysis, language modeling, and sentiment analysis for applications in conversational agents, machine translation, and text analytics.',
    },
    {
      _id: 'CLPS-411',
      name: 'Cognitive Psychology',
      description:
        'This course covers the fundamental concepts and theories of cognitive psychology, including attention, perception, memory, and language processing.',
    },
    {
      _id: 'VISN-621',
      name: 'Visual Analytics',
      description:
        'This course covers the principles and techniques of visual analytics, including data visualization, exploratory data analysis, and interactive graphics.',
    },
    {
      _id: 'PRGS-611',
      name: 'Progressive Web Applications',
      description:
        'This course covers the concepts and techniques of progressive web applications, including web app architecture, offline functionality, push notifications, and service workers.',
    },
  ],

  classSubject: [
    {
      _id: '609f42e6c2585b8aclsSub01',
      subject_id: 'ITCS-032',
      semester: 1,
      class_id: '60971b780eaf050004123456',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },

    {
      _id: '609f42e6c2585b8aclsSub02',
      subject_id: 'ITCS-032',
      semester: 3,
      class_id: '60971b780eaf050004123456',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8aclsSub03',
      subject_id: 'DSAA-033',
      semester: 2,
      class_id: '60971b780eaf050004123457',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8aclsSub04',
      subject_id: 'DSAA-033',
      semester: 1,
      class_id: '60971b780eaf050004123457',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8aclsSub05',
      subject_id: 'ITCS-032',
      semester: 2,
      class_id: '60971b780eaf050004123456',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8aclsSub06',
      subject_id: 'DSAA-033',
      semester: 3,
      class_id: '60971b780eaf050004123457',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8aclsSub07',
      subject_id: 'ITCS-032',
      semester: 1,
      class_id: '60971b780eaf050004123456',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8aclsSub08',
      subject_id: 'DSAA-033',
      semester: 2,
      class_id: '60971b780eaf050004123457',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8aclsSub09',
      subject_id: 'ITCS-032',
      semester: 3,
      class_id: '60971b780eaf050004123456',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8aclsSub10',
      subject_id: 'DSAA-033',
      semester: 1,
      class_id: '60971b780eaf050004123457',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8aclsSub11',
      subject_id: 'ITCS-032',
      semester: 2,
      class_id: '60971b780eaf050004123456',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8aclsSub12',
      subject_id: 'DSAA-033',
      semester: 3,
      class_id: '60971b780eaf050004123457',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
  ],
};

export const capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export const getGrade = (percentage) => {
  if (percentage >= 97 && percentage <= 100) {
    return 1.0;
  } else if (percentage >= 94 && percentage < 97) {
    return 1.25;
  } else if (percentage >= 91 && percentage < 94) {
    return 1.5;
  } else if (percentage >= 88 && percentage < 91) {
    return 1.75;
  } else if (percentage >= 85 && percentage < 88) {
    return 2.0;
  } else if (percentage >= 82 && percentage < 85) {
    return 2.25;
  } else if (percentage >= 79 && percentage < 82) {
    return 2.5;
  } else if (percentage >= 76 && percentage < 79) {
    return 2.75;
  } else if (percentage === 75) {
    return 3.0;
  } else if (percentage >= 65 && percentage < 75) {
    return 4.0;
  } else {
    return 5.0;
  }
};

export const convertGradeToPercentage = (grade) => {
  if (grade >= 1.0 && grade <= 1.05) {
    return 100;
  } else if (grade >= 1.06 && grade <= 1.11) {
    return 99;
  } else if (grade >= 1.12 && grade <= 1.17) {
    return 98;
  } else if (grade >= 1.18 && grade <= 1.24) {
    return 97;
  } else if (grade >= 1.25 && grade <= 1.32) {
    return 96;
  } else if (grade >= 1.33 && grade <= 1.4) {
    return 95;
  } else if (grade >= 1.41 && grade <= 1.5) {
    return 94;
  } else if (grade >= 1.51 && grade <= 1.57) {
    return 93;
  } else if (grade >= 1.58 && grade <= 1.65) {
    return 92;
  } else if (grade >= 1.66 && grade <= 1.74) {
    return 91;
  } else if (grade >= 1.75 && grade <= 1.82) {
    return 90;
  } else if (grade >= 1.83 && grade <= 1.9) {
    return 89;
  } else if (grade >= 1.91 && grade <= 1.99) {
    return 88;
  } else if (grade >= 2.0 && grade <= 2.07) {
    return 87;
  } else if (grade >= 2.08 && grade <= 2.15) {
    return 86;
  } else if (grade >= 2.16 && grade <= 2.24) {
    return 85;
  } else if (grade >= 2.25 && grade <= 2.32) {
    return 84;
  } else if (grade >= 2.33 && grade <= 2.4) {
    return 83;
  } else if (grade >= 2.41 && grade <= 2.49) {
    return 82;
  } else if (grade >= 2.5 && grade <= 2.57) {
    return 81;
  } else if (grade >= 2.58 && grade <= 2.65) {
    return 80;
  } else if (grade >= 2.66 && grade <= 2.74) {
    return 79;
  } else if (grade >= 2.75 && grade <= 2.82) {
    return 78;
  } else if (grade >= 2.83 && grade <= 2.9) {
    return 77;
  } else if (grade >= 2.91 && grade <= 3.99) {
    return 76;
  } else if (grade >= 3.0 && grade <= 3.1) {
    return 75;
  } else {
    return 0; // Indicates an invalid grade
  }
};

export const defaultImage =
  'https://res.cloudinary.com/daevedaio/image/upload/v1683957466/user_zao3gw.jpg';
