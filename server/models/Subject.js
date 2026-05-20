import mongoose from 'mongoose'

const subjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true
    },

    totalClasses: {
      type: Number,
      default: 0
    },

    attendedClasses: {
      type: Number,
      default: 0
    },

    percentage: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
)

export default mongoose.model(
  'Subject',
  subjectSchema
)