import mongoose from 'mongoose'

const attendanceEntrySchema =
  new mongoose.Schema(
    {
      date: {
        type: Date,
        required: true
      },

      subjectName: {
        type: String,
        required: true
      },

      status: {
        type: String,
        enum: [
          'Present',
          'Absent',
          'Partial'
        ],
        required: true
      },

      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    { timestamps: true }
  )

export default mongoose.model(
  'AttendanceEntry',
  attendanceEntrySchema
)