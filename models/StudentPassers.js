import mongoose from 'mongoose';

const studentsPassersSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    scores: {
      type: String,
      required: true,
    },
    year: {
      type: Number,

      default: () => new Date().getFullYear(),
    },
  },
  {
    timestamps: true,
  }
);

const StudentPassers =
  mongoose.models.StudentPassers ||
  mongoose.model('StudentPassers', studentsPassersSchema);
export default StudentPassers;
