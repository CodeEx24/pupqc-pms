import mongoose from 'mongoose';

const criteriaOverallScoresSchema = new mongoose.Schema(
  {
    classSubject_id: {
      type: mongoose.Types.ObjectId,
      ref: 'ClassSubject',
      required: true,
    },
    criteria_overall: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CriteriaOverallScores =
  mongoose.models.CriteriaOverallScores ||
  mongoose.model('CriteriaOverallScores', criteriaOverallScoresSchema);
export default CriteriaOverallScores;
