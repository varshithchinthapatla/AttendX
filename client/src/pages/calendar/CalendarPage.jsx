import { useEffect, useState } from 'react'

import Calendar from 'react-calendar'

import API from '../../api/api'

function CalendarPage() {
  const [attendance, setAttendance] =
    useState([])

  const [selectedDate, setSelectedDate] =
    useState(new Date())

  useEffect(() => {
    fetchAttendance()
  }, [])

  const fetchAttendance = async () => {
    try {
      const { data } = await API.get(
        '/attendance'
      )

      setAttendance(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getAttendanceStatus = (
    date
  ) => {
    const formatted =
      date.toDateString()

    const dayEntries =
      attendance.filter(
        (entry) =>
          new Date(
            entry.date
          ).toDateString() === formatted
      )

    if (dayEntries.length === 0)
      return ''

    const presentCount =
      dayEntries.filter(
        (e) => e.status === 'Present'
      ).length

    if (
      presentCount === dayEntries.length
    )
      return 'Present'

    if (presentCount > 0)
      return 'partial'

    return 'Absent'
  }

  const selectedEntries =
    attendance.filter(
      (entry) =>
        new Date(
          entry.date
        ).toDateString() ===
        selectedDate.toDateString()
    )

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div>
        <h1 className='text-4xl font-bold'>
          Attendance Calendar
        </h1>

        <p className='text-slate-400 mt-2'>
          Track daily attendance history
        </p>
      </div>

      {/* Calendar */}
      <div className='glass-card p-6 rounded-2xl'>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className='w-full bg-transparent border-none text-black'
          tileClassName={({ date }) => {
            const status =
              getAttendanceStatus(date)

            if (status === 'Present')
              return 'bg-green-500 text-white rounded-lg'

            if (status === 'partial')
              return 'bg-yellow-400 text-black rounded-lg'

            if (status === 'Absent')
              return 'bg-red-500 text-white rounded-lg'
          }}
        />
      </div>

      {/* Selected Day Summary */}
      <div className='glass-card p-6 rounded-2xl'>
        <h2 className='text-2xl font-bold mb-5'>
          {selectedDate.toDateString()}
        </h2>

        {selectedEntries.length === 0 ? (
          <p className='text-slate-400'>
            No attendance data
          </p>
        ) : (
          <div className='space-y-4'>
            {selectedEntries.map(
              (entry) => (
                <div
                  key={entry._id}
                  className='bg-black/20 p-4 rounded-xl flex justify-between'
                >
                  <p>
                    {entry.subjectName}
                  </p>

                  <p
                    className={
                      entry.status ===
                      'Present'
                        ? 'text-green-400'
                        : 'text-red-400'
                    }
                  >
                    {entry.status}
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CalendarPage