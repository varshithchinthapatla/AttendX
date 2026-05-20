import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const googleLogin =
  async (req, res) => {
    try {
      const { email, name } =
        req.body

      let user =
        await User.findOne({
          email
        })

      if (!user) {
        user =
          await User.create({
            email,
            name
          })
      }

      const token = jwt.sign(
        {
          id: user._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d'
        }
      )

      res.json({
        token,
        user
      })
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message: 'Login failed'
      })
    }
  }