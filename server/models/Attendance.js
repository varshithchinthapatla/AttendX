import mongoose from 'mongoose'

const attendanceSchema =
  new mongoose.Schema(
    {
      date: String,

      subjectName: String,

      status: {
        type: String,
        enum: [
          'Present',
          'Absent',
          'Partial'
        ]
      },

      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    {
      timestamps: true
    }
  )

export default mongoose.model(
  'Attendance',
  attendanceSchema
)