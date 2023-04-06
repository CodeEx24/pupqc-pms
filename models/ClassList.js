import mongoose from 'mongoose';

const classListSchema = new mongoose.Schema(
  {
    class_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    student_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ClassList =
  mongoose.models.ClassList || mongoose.model('ClassList', classListSchema);
export default ClassList;
