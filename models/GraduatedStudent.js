import mongoose from 'mongoose';

const graduatedStudentSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    course_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    year: {
      type: Number,
      required: true,
      default: () => new Date().getFullYear(),
    },
  },
  {
    timestamps: true,
  }
);

const GraduatedStudent =
  mongoose.models.GraduatedStudent ||
  mongoose.model('GraduatedStudent', graduatedStudentSchema);
export default GraduatedStudent;
