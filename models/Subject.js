import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    semester: { type: Number, required: true },
    classList_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassList',
        required: true,
      },
    ],
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
  },
  {
    timestamps: true,
  }
);

const Subject =
  mongoose.models.Subject || mongoose.model('Subject', subjectSchema);
export default Subject;
