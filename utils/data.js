import bcrypt from 'bcryptjs';

import {
  AiFillHome,
  AiFillIdcard,
  AiFillCalendar,
  AiFillSnippets,
  AiFillDiff,
} from 'react-icons/ai';

import { RiContactsLine } from 'react-icons/ri';

import { FaMoneyBillAlt, FaUser } from 'react-icons/fa';

import { TbReportAnalytics } from 'react-icons/tb';

export const studentLinks = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'home',
        icon: <AiFillHome />,
      },
      {
        name: 'profile',
        icon: <FaUser />,
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
        name: 'criteria',
        href: 'criteria',
        icon: <AiFillIdcard />,
      },
      {
        name: 'criteria management',
        href: 'criteria-management',
        icon: <AiFillIdcard />,
      },

      // {
      //   name: 'section',
      //   href: 'section',
      //   icon: <FaMoneyBillAlt />,
      // },

      // {
      //   name: 'attendance',
      //   href: 'attendance',
      //   icon: <TbReportAnalytics />,
      // },
      // {
      //   name: 'students grade',
      //   href: 'students-grade',
      //   icon: <AiFillSnippets />,
      // },
      {
        name: 'profile',
        href: 'profile',
        icon: <FaUser />,
      },

      // {
      //   name: 'hdf',
      //   icon: <RiContactsLine />,
      // },
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
    {
      _id: '609e16f7c2585b8a5f9ddc04',
      name: 'Alice Johnson',
      email: 'alicejohnson@gmail.com',
      password: bcrypt.hashSync('alice24'),
      gender: 'Female',
      dateOfBirth: new Date('1998-07-14'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '9876543210',
      residentialAddress: '456 Pine Street, Los Angeles',
      isAdmin: false,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc05',
      name: 'Maggie Lee',
      email: 'maggielee@yahoo.com',
      password: bcrypt.hashSync('maggie123'),
      gender: 'Female',
      dateOfBirth: new Date('2000-02-29'),
      placeOfBirth: 'San Francisco',
      mobileNo: '8765432109',
      residentialAddress: '789 Maple Street, San Francisco',
      isAdmin: false,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc06',
      name: 'Harry Brown',
      email: 'harrybrown@hotmail.com',
      password: bcrypt.hashSync('harry24'),
      gender: 'Male',
      dateOfBirth: new Date('1997-11-18'),
      placeOfBirth: 'Houston',
      mobileNo: '3456789012',
      residentialAddress: '567 Elm Street, Houston',
      isAdmin: false,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc07',
      name: 'John Doe',
      email: 'student2@gmail.com',
      password: bcrypt.hashSync('admin24'),
      gender: 'Male',
      dateOfBirth: new Date('1995-05-01'),
      placeOfBirth: 'New York',
      mobileNo: '1234567890',
      residentialAddress: '123 Main Street, New York',
      isAdmin: false,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc08',
      name: 'Jane Doe',
      email: 'jane.doe@gmail.com',
      password: bcrypt.hashSync('test123'),
      gender: 'Female',
      dateOfBirth: new Date('1998-09-12'),
      placeOfBirth: 'Los Angeles',
      mobileNo: '9876543210',
      residentialAddress: '456 Elm Street, Los Angeles',
      isAdmin: false,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc09',
      name: 'Alice Brown',
      email: 'alice.brown@gmail.com',
      password: bcrypt.hashSync('password123'),
      gender: 'Female',
      dateOfBirth: new Date('1997-06-05'),
      placeOfBirth: 'Houston',
      mobileNo: '9876543211',
      residentialAddress: '789 Maple Street, Houston',
      isAdmin: false,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc10',
      name: 'Mark Johnson',
      email: 'mark.johnson@gmail.com',
      password: bcrypt.hashSync('qwerty123'),
      gender: 'Male',
      dateOfBirth: new Date('1994-03-15'),
      placeOfBirth: 'San Francisco',
      mobileNo: '1234567891',
      residentialAddress: '456 Oak Street, San Francisco',
      isAdmin: false,
    },
  ],
  teachers: [
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
      isAdmin: true,
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
      isAdmin: true,
    },
    {
      _id: '609e16f7c2585b8a5f9ddc53',
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
      _id: '609e16f7c2585b8a5f9ddc54',
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
      teacher_id: '609e16f7c2585b8a5f9ddc51',
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
      teacher_id: '609e16f7c2585b8a5f9ddc51',
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
      student_id: [
        '609e16f7c2585b8a5f9ddc01',
        '609e16f7c2585b8a5f9ddc02',
        '609e16f7c2585b8a5f9ddc03',
      ],
    },
    {
      _id: '60971b780eaf050004123457',
      course_id: '606c80b0a6d0e64b130e6f04',
      name: 'BFA',
      year: 4,
      section: 2,
      batch: '2023',
      student_id: [
        '609e16f7c2585b8a5f9ddc04',
        '609e16f7c2585b8a5f9ddc05',
        '609e16f7c2585b8a5f9ddc06',
      ],
    },
    {
      _id: '60971b780eaf050004123458',
      course_id: '606c80b0a6d0e64b130e6f05',
      name: 'BSIT',
      year: 3,
      section: 1,
      batch: '2023',
      student_id: ['609e16f7c2585b8a5f9ddc07', '609e16f7c2585b8a5f9ddc08'],
    },
    {
      _id: '60971b780eaf050004123459',
      course_id: '606c80b0a6d0e64b130e6f04',
      name: 'BFA',
      year: 3,
      section: 1,
      batch: '2023',
      student_id: ['609e16f7c2585b8a5f9ddc09', '609e16f7c2585b8a5f9ddc10'],
    },
  ],

  classSubject: [
    {
      _id: '609f42e6c2585b8a5f9ddc01',
      subject_id: 'ITCS-032',
      semester: 1,
      class_id: '60971b780eaf050004123456',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },

    {
      _id: '609f42e6c2585b8a5f9ddc02',
      subject_id: 'ITCS-032',
      semester: 3,
      class_id: '60971b780eaf050004123456',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8a5f9ddc11',
      subject_id: 'DSAA-033',
      semester: 2,
      class_id: '60971b780eaf050004123457',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8a5f9ddc12',
      subject_id: 'DSAA-033',
      semester: 1,
      class_id: '60971b780eaf050004123457',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8a5f9ddc03',
      subject_id: 'ITCS-032',
      semester: 2,
      class_id: '60971b780eaf050004123456',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8a5f9ddc13',
      subject_id: 'DSAA-033',
      semester: 3,
      class_id: '60971b780eaf050004123457',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8a5f9ddc04',
      subject_id: 'ITCS-032',
      semester: 1,
      class_id: '60971b780eaf050004123456',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8a5f9ddc14',
      subject_id: 'DSAA-033',
      semester: 2,
      class_id: '60971b780eaf050004123457',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8a5f9ddc05',
      subject_id: 'ITCS-032',
      semester: 3,
      class_id: '60971b780eaf050004123456',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8a5f9ddc15',
      subject_id: 'DSAA-033',
      semester: 1,
      class_id: '60971b780eaf050004123457',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8a5f9ddc06',
      subject_id: 'ITCS-032',
      semester: 2,
      class_id: '60971b780eaf050004123456',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
    },
    {
      _id: '609f42e6c2585b8a5f9ddc16',
      subject_id: 'DSAA-033',
      semester: 3,
      class_id: '60971b780eaf050004123457',
      teacher_id: '609e16f7c2585b8a5f9ddc51',
      criteria_id: '609e16f7c2585b8a5f9ddc24',
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
};

export const capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
