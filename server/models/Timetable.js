import mongoose from 'mongoose'

const periodSchema =
  new mongoose.Schema({
    subjectName: String,

    startTime: String,

    endTime: String,

    faculty: String,

    roomNumber: String
  })

const timetableSchema =
  new mongoose.Schema(
    {
      day: String,

      periods: [periodSchema]
    },
    { timestamps: true }
  )

export default mongoose.model(
  'Timetable',
  timetableSchema
)