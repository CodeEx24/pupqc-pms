import mongoose from 'mongoose';
import { defaultImage } from '../utils/data';

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String, required: true },
    mobileNo: { type: String, required: true },
    residentialAddress: { type: String, required: true },
    isAdmin: { type: Number, required: true },
    profileImageUrl: {
      type: String,
      required: true,
      default: defaultImage,
    },
  },
  {
    timestamps: true,
  }
);

// Check if User Model already created. But if null it will create a model name and the schema (type) as second parameter
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

export default Admin;
