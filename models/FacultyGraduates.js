import mongoose from 'mongoose';

const facultyAchievementSchema = new mongoose.Schema(
  {
    teacher_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
    achievement_type: {
      type: 'String',
      required: true,
    },
    title: {
      type: 'String',
      required: true,
    },
    year: {
      type: Number,
      required: true,
      default: () => new Date().getFullYear(),
    },
  },
  {
    timestamps: true,
  }
);

const FacultyAchievement =
  mongoose.models.FacultyAchievement ||
  mongoose.model('FacultyAchievement', facultyAchievementSchema);
export default FacultyAchievement;
