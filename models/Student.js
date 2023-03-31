import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
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
const Student =
  mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;
