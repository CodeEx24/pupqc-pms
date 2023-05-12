import mongoose from 'mongoose';

const studentGradeSchema = new mongoose.Schema(
  {
    classSubject_id: {
      type: mongoose.Types.ObjectId,
      ref: 'ClassSubject',
      required: true,
    },
    student_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Student',
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

const StudentGrade =
  mongoose.models.StudentGrade ||
  mongoose.model('StudentGrade', studentGradeSchema);
export default StudentGrade;
