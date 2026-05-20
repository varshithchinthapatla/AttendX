import Attendance from '../models/Attendance.js'

export const getDashboard =
  async (req, res) => {
    try {
      const attendance =
        await Attendance.find()

      const totalClasses =
        attendance.length

      const attendedClasses =
        attendance.filter(
          (a) => a.status === 'Present'
        ).length

      const missedClasses =
        attendance.filter(
          (a) => a.status === 'Absent'
        ).length

      const overallPercentage =
        totalClasses > 0
          ? Math.round(
              (attendedClasses /
                totalClasses) *
                100
            )
          : 0

      const subjectMap = {}

      attendance.forEach((a) => {
        if (!subjectMap[a.subject]) {
          subjectMap[a.subject] = {
            total: 0,
            present: 0
          }
        }

        subjectMap[a.subject].total++

        if (a.status === 'Present') {
          subjectMap[a.subject].present++
        }
      })

      const subjects =
        Object.keys(subjectMap).map(
          (subjectName) => ({
            subjectName,

            percentage: Math.round(
              (subjectMap[subjectName]
                .present /
                subjectMap[subjectName]
                  .total) *
                100
            )
          })
        )

      res.json({
        totalClasses,
        attendedClasses,
        missedClasses,
        overallPercentage,
        subjects
      })
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message:
          'Dashboard fetch failed'
      })
    }
  }