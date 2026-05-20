import express from 'express'

import {
  getTodayAttendance,
  markAttendance,
  getAttendance,
  updateAttendance
} from '../controllers/attendanceController.js'

const router = express.Router()

router.get(
  '/today',
  getTodayAttendance
)

router.post(
  '/mark',
  markAttendance
)

router.put(
  '/:id',
  updateAttendance
)

router.get(
  '/',
  getAttendance
)

export default router