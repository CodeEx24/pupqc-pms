import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    course_code: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export default Course;
