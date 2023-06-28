import bcrypt from 'bcryptjs';

export const teachers = [
  //TESTING DATA
  // Per teacher must tought 5 subjects per semester
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
];