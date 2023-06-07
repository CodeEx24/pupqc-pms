import mongoose from 'mongoose';

const studentClassGradeSchema = new mongoose.Schema(
  {
    class_id: {
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
    semester: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const StudentClassGrade =
  mongoose.models.StudentClassGrade ||
  mongoose.model('StudentClassGrade', studentClassGradeSchema);
export default StudentClassGrade;
