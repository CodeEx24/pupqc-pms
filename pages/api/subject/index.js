// /api/subject - USED

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import Subject from '@/models/Subject';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session.user.isAdmin) {
    return res.status(401).send('Signin required');
  }

  await db.connect();

  const subjects = await Subject.find();

  await db.disconnect();

  res.status(200).json(subjects);
};

export default handler;

// WITH PAGINACTION
// import db from '@/utils/db';
// import Subject from '@/models/Subject';

// const handler = async (req, res) => {
//   await db.connect();

//   const skip = parseInt(req.query.$skip) || 0; // convert query parameter to number or default to 0
//   const top = parseInt(req.query.$top) || 10; // convert query parameter to number or default to 10

//   const countPromise = Subject.countDocuments();
//   const itemsPromise = Subject.find().skip(skip).limit(top);

//   const [count, items] = await Promise.all([countPromise, itemsPromise]);

//   await db.disconnect();

//   res.status(200).json({ result: items, count: count });
// };

// export default handler;
