import mongoose from 'mongoose';

const studentClassSubjectGradeSchema = new mongoose.Schema(
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

const StudentClassSubjectGrade =
  mongoose.models.StudentClassSubjectGrade ||
  mongoose.model('StudentClassSubjectGrade', studentClassSubjectGradeSchema);
export default StudentClassSubjectGrade;
