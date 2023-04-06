import Student from '@/models/Student';
import Teacher from '@/models/Teacher';
import bcryptjs from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import db from '../../../utils/db';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.isAdmin = user.isAdmin;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isAdmin = token.isAdmin;
      }

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
            gender: user.gender,
            isAdmin: user.isAdmin,
            dob: user.dateOfBirth,
            pob: user.placeOfBirth,
            mobileNo: user.mobileNo,
            residentialAddress: user.resedentialAddress,
          };
        }

        // Throw an error if authentication is unsuccessful
        throw new Error('Invalid email or password');
      },
    }),
  ],
});
