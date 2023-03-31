import Student from '@/models/Student';
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

      // if (user?._id) token._id = user._id;
      // if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isAdmin = token.isAdmin;
      }

      // if (token?._id) session.user._id = token._id;
      // if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();

        if (credentials.type === 'Student') {
          const student = await Student.findOne({ email: credentials.email });

          console.log(student);
          await db.disconnect();

          if (
            student &&
            bcryptjs.compareSync(credentials.password, student.password)
          ) {
            return {
              _id: student._id,
              name: student.name,
              email: student.email,
              gender: student.gender,
              isAdmin: student.isAdmin,
              dob: student.dateOfBirth,
              pob: student.placeOfBirth,
              mobileNo: student.mobileNo,
              residentialAddress: student.resedentialAddress,
            };
          }

          // Throw an error if authentication is unsuccessful
          throw new Error('Invalid email or password');
        }
      },
    }),
  ],
});
