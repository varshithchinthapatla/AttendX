import { useEffect, useState } from 'react'
import API from '../../api/api'

function Attendance() {
  const [subjects, setSubjects] = useState([])
  const [todayAttendance, setTodayAttendance] =
    useState([])

  useEffect(() => {
    fetchSubjects()
    fetchTodayAttendance()
  }, [])

  const fetchSubjects = async () => {
    try {
      const { data } = await API.get(
        '/subjects'
      )

      setSubjects(data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchTodayAttendance =
    async () => {
      try {
        const { data } =
          await API.get(
            '/attendance/today'
          )

        setTodayAttendance(data)
      } catch (err) {
        console.log(err)
      }
    }

  const markAttendance =
    async (
      subjectName,
      status
    ) => {
      try {
        await API.post(
          '/attendance/mark',
          {
            subjectName,
            status
          }
        )

        fetchTodayAttendance()
      } catch (err) {
        console.log(err)
      }
    }

  const updateAttendance =
    async (
      attendanceId,
      status
    ) => {
      try {
        await API.put(
          `/attendance/${attendanceId}`,
          { status }
        )

        fetchTodayAttendance()
      } catch (err) {
        console.log(err)
      }
    }

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-4xl font-bold'>
          Attendance
        </h1>

        <p className='text-slate-400 mt-2'>
          Mark and edit today attendance
        </p>
      </div>

      <div className='grid gap-5'>
        {subjects.map((subject) => {
          const existing =
            todayAttendance.find(
              (a) =>
                a.subjectName ===
                subject.subjectName
            )

          return (
            <div
              key={subject._id}
              className='glass-card p-5 rounded-3xl flex flex-col md:flex-row md:items-center md:justify-between gap-4'
            >
              <div>
                <h2 className='text-2xl font-bold'>
                  {subject.subjectName}
                </h2>

                <p className='text-slate-400'>
                  {subject.faculty}
                </p>
              </div>

              {!existing ? (
                <div className='flex gap-3'>
                  <button
                    onClick={() =>
                      markAttendance(
                        subject.subjectName,
                        'Present'
                      )
                    }
                    className='bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl'
                  >
                    Present
                  </button>

                  <button
                    onClick={() =>
                      markAttendance(
                        subject.subjectName,
                        'Absent'
                      )
                    }
                    className='bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl'
                  >
                    Absent
                  </button>
                </div>
              ) : (
                <div className='space-y-2'>
                  <p className='font-semibold'>
                    Marked:{' '}
                    {existing.status}
                  </p>

                  <div className='flex gap-3'>
                    <button
                      onClick={() =>
                        updateAttendance(
                          existing._id,
                          'Present'
                        )
                      }
                      className='bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl'
                    >
                      Change to Present
                    </button>

                    <button
                      onClick={() =>
                        updateAttendance(
                          existing._id,
                          'Absent'
                        )
                      }
                      className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl'
                    >
                      Change to Absent
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Attendance