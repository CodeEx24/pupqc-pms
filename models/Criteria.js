import mongoose from 'mongoose';

const criteriaSchema = new mongoose.Schema(
  {
    teacher_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
    criteria: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
);

const Criteria =
  mongoose.models.Criteria || mongoose.model('Criteria', criteriaSchema);
export default Criteria;
