import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session.user.isAdmin) {
    return res.status(401).send('Signin required');
  }

  const { year, yearLevel } = req.query;
  console.log(year, yearLevel);

  await db.connect();

  await db.disconnect();

  res.json({ message: 'Successfully connected' });
};

export default handler;
