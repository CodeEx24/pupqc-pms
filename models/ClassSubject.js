import mongoose from 'mongoose';

// {semester, subject_id, class_id, teacher_id, criteria_id}

const classSubjectSchema = new mongoose.Schema(
  {
    semester: { type: Number, required: true },
    subject_id: {
      type: String,
      ref: 'Subject',
      required: true,
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    teacher_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
    criteria_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Criteria',
      required: true,
    },
    isGradeFinalized: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ClassSubject =
  mongoose.models.ClassSubject ||
  mongoose.model('ClassSubject', classSubjectSchema);
export default ClassSubject;
