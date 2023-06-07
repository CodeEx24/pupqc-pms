import mongoose from 'mongoose';

const semesterGradeSchema = new mongoose.Schema(
  {
    class_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    student_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SemesterGrade =
  mongoose.models.SemesterGrade ||
  mongoose.model('SemesterGrade', semesterGradeSchema);
export default SemesterGrade;
