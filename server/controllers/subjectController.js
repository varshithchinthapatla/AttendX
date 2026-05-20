import Subject from '../models/Subject.js'

export const createSubject =
  async (req, res) => {
    try {
      const subject =
        await Subject.create(
          req.body
        )

      res.json(subject)
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message:
          'Failed to create subject'
      })
    }
  }

export const getSubjects =
  async (req, res) => {
    try {
      const subjects =
        await Subject.find()

      res.json(subjects)
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message:
          'Failed to fetch subjects'
      })
    }
  }