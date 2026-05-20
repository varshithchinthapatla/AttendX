import express from 'express'

import {
  saveTimetable,
  getTimetable,
  deletePeriod
} from '../controllers/timetableController.js'

const router = express.Router()

router.post(
  '/',
  saveTimetable
)

router.get(
  '/',
  getTimetable
)

router.delete(
  '/:timetableId/:periodId',
  deletePeriod
)

export default router