import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    ref: 'User',
  },
  otp: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '10m' },
  },
});

const Otp = mongoose.models.Otp || mongoose.model('Otp', otpSchema);
export default Otp;
