import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
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
    profileImageUrl: {
      type: String,
      required: true,
      default:
        'https://res.cloudinary.com/daevedaio/image/upload/v1683093300/hm19yu8dnpiolkcyrkq7.jpg',
    },
  },
  {
    timestamps: true,
  }
);

// Check if User Model already created. But if null it will create a model name and the schema (type) as second parameter
const Teacher =
  mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);

export default Teacher;
