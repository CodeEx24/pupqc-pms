import Student from '@/models/Student';
import Teacher from '@/models/Teacher';
import bcryptjs from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import db from '../../../utils/db';

export const authOptions = {
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      if (user?.profile) token.profile = user.profile;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      if (token?.profile) session.user.profile = token.profile;

      return session;
    },
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();

        const userModel = credentials.type === 'Student' ? Student : Teacher;

        const user = await userModel.findOne({ email: credentials.email });

        await db.disconnect();

        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            profile: user.profileImageUrl,
          };
        }

        // Throw an error if authentication is unsuccessful
        throw new Error('Invalid email or password');
      },
    }),
  ],
};

export default NextAuth(authOptions);
