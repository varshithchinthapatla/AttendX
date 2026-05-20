import Attendance from '../models/Attendance.js'

export const markAttendance =
  async (req, res) => {
    try {
      const {
        subjectName,
        status
      } = req.body

      const existing =
        await Attendance.findOne({
          subjectName,
          date: new Date()
            .toISOString()
            .split('T')[0]
        })

      if (existing) {
        existing.status = status

        await existing.save()

        return res.json(existing)
      }

      const attendance =
        await Attendance.create({
          subjectName,
          status,
          date: new Date()
            .toISOString()
            .split('T')[0]
        })

      res.json(attendance)
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message:
          'Attendance marking failed'
      })
    }
  }

export const updateAttendance =
  async (req, res) => {
    try {
      const { id } = req.params

      const { status } = req.body

      const attendance =
        await Attendance.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        )

      res.json(attendance)
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message:
          'Update failed'
      })
    }
  }

export const getAttendance =
  async (req, res) => {
    try {
      const attendance =
        await Attendance.find().sort({
          createdAt: -1
        })

      res.json(attendance)
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message:
          'Failed to fetch attendance'
      })
    }
  }

export const getTodayAttendance =
  async (req, res) => {
    try {
      const today =
        new Date()
          .toISOString()
          .split('T')[0]

      const attendance =
        await Attendance.find({
          date: today
        })

      res.json(attendance)
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message:
          'Failed to fetch today attendance'
      })
    }
  }