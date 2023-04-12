import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import Class from '@/models/Class';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send('Signin required');
  }

  await db.connect();

  const classList = await Class.find({ batch: req.query.year });

  const classListRecord = classList.map((cls) => {
    return {
      name: cls.name + ' ' + cls.year + '-' + cls.section,
      id: cls._id,
      batch: cls.batch,
    };
  });

  res.send(classListRecord);
};

export default handler;
