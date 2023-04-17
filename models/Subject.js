import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Subject Code
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Subject =
  mongoose.models.Subject || mongoose.model('Subject', subjectSchema);
export default Subject;
