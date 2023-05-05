import mongoose from 'mongoose';

const studentRecordsSchema = new mongoose.Schema(
  {
    criteriaOverallScores_id: {
      type: mongoose.Types.ObjectId,
      ref: 'CriteriaOverallScores',
      required: true,
    },
    student_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    records: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
);

const StudentRecords =
  mongoose.models.StudentRecords ||
  mongoose.model('StudentRecords', studentRecordsSchema);
export default StudentRecords;
