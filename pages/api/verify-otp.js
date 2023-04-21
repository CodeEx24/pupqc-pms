import Otp from '../../models/Otp';
import db from '../../utils/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, otp } = req.body;

  await db.connect();

  const otpHashed = await Otp.findOne({ email });

  const isMatch = bcrypt.compareSync(otp, otpHashed.otp);

  if (!isMatch) {
    return res
      .status(404)
      .json({ message: 'Please enter a valid OTP provided in the email.' });
  }

  return res.status(200).json({ message: 'OTP sent successfully' });
}
