import mongoose from 'mongoose';

const averageClassGrade = new mongoose.Schema(
  {
    classSubject_id: {
      type: mongoose.Types.ObjectId,
      ref: 'ClassSubject',
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    passed: {
      type: Number,
      default: 0,
    },
    failed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const AverageClassGrade =
  mongoose.models.AverageClassGrade ||
  mongoose.model('AverageClassGrade', averageClassGrade);
export default AverageClassGrade;
