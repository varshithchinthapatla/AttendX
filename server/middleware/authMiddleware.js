import admin from '../firebaseAdmin.js'

const authMiddleware = async (
  req,
  res,
  next
) =>  {
  console.log(
    req.headers.authorization
  )
  try {
    const authHeader =
      req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({
        message: 'No token'
      })
    }

    const token =
      authHeader.split('Bearer ')[1]

    const decoded =
      await admin
        .auth()
        .verifyIdToken(token)

    req.user = decoded

    next()
  } catch (error) {
    console.log(error)

    return res.status(401).json({
      message: 'Unauthorized'
    })
  }
}

export default authMiddleware