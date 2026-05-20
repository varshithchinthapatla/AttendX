import Attendance from '../models/Attendance.js'

export const markAttendance =
  async (req, res) => {
    try {
      const {
        subjectName,
        status
      } = req.body

      const attendance =
        await Attendance.create({
          subjectName,
          status,
          userId: req.user._id,
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

export const getAttendance =
  async (req, res) => {
    try {
      const attendance =
        await Attendance.find({
          userId: req.user._id
        }).sort({
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
          userId: req.user._id,
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

export const updateAttendance =
  async (req, res) => {
    try {
      const { status } = req.body

      const attendance =
        await Attendance.findByIdAndUpdate(
          req.params.id,
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