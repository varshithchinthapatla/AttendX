import express from 'express'

import jwt from 'jsonwebtoken'

const router = express.Router()

router.post(
  '/google',
  async (req, res) => {
    try {
      const token = jwt.sign(
        {
          id: 'demoUser'
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '30d'
        }
      )

      res.json({ token })
    } catch (err) {
      res.status(500).json({
        message:
          'Server Error'
      })
    }
  }
)

export default router