import bcrypt from 'bcryptjs';

const data = {
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
      isAdmin: true,
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
  // teachers: [
  //   {
  //     name: 'John',
  //     email: 'admin@example.com',
  //     password: bcrypt.hashSync('123456'),
  //     isAdmin: true,
  //   },
  //   {
  //     name: 'Jane',
  //     email: 'user@example.com',
  //     password: bcrypt.hashSync('123456'),
  //     isAdmin: false,
  //   },
  // ],
};

export default data;
