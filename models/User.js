import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String, required: true },
    mobileNo: { type: String, required: true },
    residentialAddress: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

// Check if User Model already created. But if null it will create a model name and the schema (type) as second parameter
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
