import Otp from '../../models/Otp';
import Student from '../../models/Student';
import Teacher from '../../models/Teacher';
import db from '../../utils/db';
import sendEmail from '../../utils/send-email';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, type } = req.body;

  const userType = type === 'Faculty' ? Teacher : Student;

  await db.connect();

  // Check if email exists in the database
  const user = await userType.findOne({ email });

  if (!user) {
    await db.disconnect();
    return res.status(404).json({ message: 'Email not found' });
  }

  // Generate a new OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  const hashedOtp = await bcrypt.hash(otp.toString(), 10);

  // Set an expiration time for the OTP
  const expiredAt = Date.now() + 10 * 60 * 1000; // 10 minutes in milliseconds

  const existOtp = await Otp.findOne({ email });

  if (existOtp) {
    await existOtp.deleteOne();
  }

  const newOtp = new Otp({
    email,
    otp: hashedOtp,
    expiredAt,
  });

  await newOtp.save();

  await db.disconnect();

  // Send OTP to user's email
  const subject = 'Reset Password OTP';
  const html = `
    <p>Your OTP for resetting password is <strong>${otp}</strong></p>
  `;
  await sendEmail(email, subject, html);

  return res.status(200).json({ message: 'OTP sent successfully' });
}
