import Timetable from '../models/Timetable.js'

export const saveTimetable =
  async (req, res) => {
    try {
      const { day, periods } =
        req.body

      let timetable =
        await Timetable.findOne({
          day
        })

      if (timetable) {
        timetable.periods =
          periods

        await timetable.save()
      } else {
        timetable =
          await Timetable.create({
            day,
            periods
          })
      }

      res.json(timetable)
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message:
          'Failed to save timetable'
      })
    }
  }

export const getTimetable =
  async (req, res) => {
    try {
      const timetable =
        await Timetable.find()

      res.json(timetable)
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message:
          'Failed to fetch timetable'
      })
    }
  }

export const deletePeriod =
  async (req, res) => {
    try {
      const {
        timetableId,
        periodId
      } = req.params

      const timetable =
        await Timetable.findById(
          timetableId
        )

      timetable.periods =
        timetable.periods.filter(
          (period) =>
            period._id.toString() !==
            periodId
        )

      await timetable.save()

      res.json({
        message:
          'Period deleted'
      })
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message:
          'Delete failed'
      })
    }
  }