import { useEffect, useState } from 'react'

import API from '../../api/api'

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

function Timetable() {
  const [selectedDay, setSelectedDay] =
    useState('Monday')

  const [subjectName, setSubjectName] =
    useState('')

  const [startTime, setStartTime] =
    useState('')

  const [endTime, setEndTime] =
    useState('')

  const [faculty, setFaculty] =
    useState('')

  const [roomNumber, setRoomNumber] =
    useState('')

  const [editingId, setEditingId] =
    useState(null)

  const [timetable, setTimetable] =
    useState([])

  useEffect(() => {
    fetchTimetable()
  }, [])

  const fetchTimetable = async () => {
    try {
      const response =
        await API.get('/timetable')

      console.log(response.data)

      const timetableData =
        response.data.timetable ||
        response.data

      setTimetable(timetableData)
    } catch (error) {
      console.log(error)
    }
  }

  const resetForm = () => {
    setSubjectName('')
    setStartTime('')
    setEndTime('')
    setFaculty('')
    setRoomNumber('')
    setEditingId(null)
  }

  const addOrUpdateClass =
    async () => {
      if (
        !subjectName ||
        !startTime ||
        !endTime
      ) {
        alert(
          'Please fill required fields'
        )

        return
      }

      try {
        const existingDay =
          timetable.find(
            (t) =>
              t.day === selectedDay
          )

        let periods = existingDay
          ? [...existingDay.periods]
          : []

        if (editingId) {
          periods = periods.map(
            (period) =>
              period._id === editingId
                ? {
                    ...period,
                    subjectName,
                    startTime,
                    endTime,
                    faculty,
                    roomNumber
                  }
                : period
          )
        } else {
          periods.push({
            subjectName,
            startTime,
            endTime,
            faculty,
            roomNumber
          })
        }

        await API.post(
          '/timetable',
          {
            day: selectedDay,
            periods
          }
        )

        await fetchTimetable()

        resetForm()
      } catch (error) {
        console.log(error)
      }
    }

  const deleteClass = async (
    timetableId,
    periodId
  ) => {
    try {
      await API.delete(
        `/timetable/${timetableId}/${periodId}`
      )

      fetchTimetable()
    } catch (error) {
      console.log(error)
    }
  }

  const editClass = (
    period,
    day
  ) => {
    setSelectedDay(day)

    setSubjectName(
      period.subjectName
    )

    setStartTime(
      period.startTime
    )

    setEndTime(period.endTime)

    setFaculty(
      period.faculty || ''
    )

    setRoomNumber(
      period.roomNumber || ''
    )

    setEditingId(period._id)

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className='space-y-8 pb-28'>
      {/* Header */}
      <div>
        <h1 className='text-3xl md:text-4xl font-bold'>
          Timetable
        </h1>

        <p className='text-slate-400 mt-2'>
          Manage weekly class
          schedule
        </p>
      </div>

      {/* Form */}
      <div className='glass-card p-6 rounded-3xl grid md:grid-cols-2 gap-4'>
        <select
          value={selectedDay}
          onChange={(e) =>
            setSelectedDay(
              e.target.value
            )
          }
          className='bg-slate-900 p-3 rounded-xl'
        >
          {days.map((day) => (
            <option
              key={day}
              value={day}
            >
              {day}
            </option>
          ))}
        </select>

        <input
          type='text'
          placeholder='Subject Name'
          value={subjectName}
          onChange={(e) =>
            setSubjectName(
              e.target.value
            )
          }
          className='bg-slate-900 p-3 rounded-xl'
        />

        <input
          type='time'
          value={startTime}
          onChange={(e) =>
            setStartTime(
              e.target.value
            )
          }
          className='bg-slate-900 p-3 rounded-xl'
        />

        <input
          type='time'
          value={endTime}
          onChange={(e) =>
            setEndTime(
              e.target.value
            )
          }
          className='bg-slate-900 p-3 rounded-xl'
        />

        <input
          type='text'
          placeholder='Faculty'
          value={faculty}
          onChange={(e) =>
            setFaculty(
              e.target.value
            )
          }
          className='bg-slate-900 p-3 rounded-xl'
        />

        <input
          type='text'
          placeholder='Room Number'
          value={roomNumber}
          onChange={(e) =>
            setRoomNumber(
              e.target.value
            )
          }
          className='bg-slate-900 p-3 rounded-xl'
        />

        <div className='flex gap-3'>
          <button
            onClick={
              addOrUpdateClass
            }
            className='bg-blue-600 hover:bg-blue-700 transition p-3 rounded-xl font-semibold w-full'
          >
            {editingId
              ? 'Update Class'
              : 'Add Class'}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className='bg-slate-700 hover:bg-slate-600 transition p-3 rounded-xl'
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Timetable Display */}
      <div className='space-y-6'>
        {days.map((day) => {
          const dayData =
            timetable.find(
              (t) =>
                t.day === day
            )

          return (
            <div
              key={day}
              className='glass-card p-6 rounded-3xl'
            >
              <h2 className='text-2xl font-bold mb-5'>
                {day}
              </h2>

              {!dayData ||
              !dayData.periods ||
              dayData.periods
                .length === 0 ? (
                <p className='text-slate-400'>
                  No classes added
                </p>
              ) : (
                <div className='space-y-4'>
                  {dayData.periods
                    .sort((a, b) =>
                      a.startTime.localeCompare(
                        b.startTime
                      )
                    )
                    .map((period) => (
                      <div
                        key={
                          period._id
                        }
                        className='bg-black/20 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
                      >
                        <div>
                          <h3 className='text-xl font-semibold'>
                            {
                              period.subjectName
                            }
                          </h3>

                          <p className='text-slate-400'>
                            {
                              period.startTime
                            }{' '}
                            -{' '}
                            {
                              period.endTime
                            }
                          </p>

                          <p className='text-slate-500 text-sm'>
                            {
                              period.faculty
                            }{' '}
                            •{' '}
                            {
                              period.roomNumber
                            }
                          </p>
                        </div>

                        <div className='flex gap-3'>
                          <button
                            onClick={() =>
                              editClass(
                                period,
                                day
                              )
                            }
                            className='bg-yellow-500 hover:bg-yellow-600 transition px-4 py-2 rounded-xl'
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              deleteClass(
                                dayData._id,
                                period._id
                              )
                            }
                            className='bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-xl'
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Timetable