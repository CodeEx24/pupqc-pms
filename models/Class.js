import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    name: { type: String, required: true },
    year: { type: Number, required: true },
    section: { type: Number, required: true },
    batch: { type: String, required: true },
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

const Class = mongoose.models.Class || mongoose.model('Class', classSchema);
export default Class;
