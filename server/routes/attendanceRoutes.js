import express from 'express'

import {
  getTodayAttendance,
  markAttendance,
  getAttendance,
  updateAttendance
} from '../controllers/attendanceController.js'

import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get(
  '/today',
  authMiddleware,
  getTodayAttendance
)

router.post(
  '/mark',
  authMiddleware,
  markAttendance
)

router.put(
  '/:id',
  authMiddleware,
  updateAttendance
)

router.get(
  '/',
  authMiddleware,
  getAttendance
)

export default router