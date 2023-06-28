import bcrypt from 'bcryptjs';

export const admins = [
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
];
