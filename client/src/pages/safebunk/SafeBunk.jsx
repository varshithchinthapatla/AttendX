import { useEffect, useState } from 'react'

import API from '../../api/api'

function SafeBunk() {
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    try {
      const { data } = await API.get(
        '/subjects'
      )

      setSubjects(data)
    } catch (error) {
      console.log(error)
    }
  }

  const calculateSafeBunks = (
    attended,
    total
  ) => {
    let bunkCount = 0

    while (
      (attended / (total + bunkCount + 1)) *
        100 >=
      75
    ) {
      bunkCount++
    }

    return bunkCount
  }

  const calculateRecovery = (
    attended,
    total
  ) => {
    let needed = 0

    while (
      ((attended + needed) /
        (total + needed)) *
        100 <
      75
    ) {
      needed++
    }

    return needed
  }

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-4xl font-bold'>
          Safe Bunk Calculator
        </h1>

        <p className='text-slate-400 mt-2'>
          Know how many classes you can
          safely miss
        </p>
      </div>

      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
        {subjects.map((subject) => {
          const safeBunks =
            calculateSafeBunks(
              subject.attendedClasses,
              subject.totalClasses
            )

          const recovery =
            calculateRecovery(
              subject.attendedClasses,
              subject.totalClasses
            )

          return (
            <div
              key={subject._id}
              className='glass-card p-6 rounded-2xl space-y-5'
            >
              <div>
                <h2 className='text-2xl font-bold'>
                  {subject.subjectName}
                </h2>

                <p className='text-slate-400'>
                  Attendance:{' '}
                  {subject.percentage}%
                </p>
              </div>

              {subject.percentage >= 75 ? (
                <div className='bg-green-500/20 border border-green-500 rounded-xl p-4'>
                  <p className='text-green-400 font-semibold'>
                    You can safely bunk{' '}
                    {safeBunks} more classes.
                  </p>
                </div>
              ) : (
                <div className='bg-red-500/20 border border-red-500 rounded-xl p-4'>
                  <p className='text-red-400 font-semibold'>
                    Attend next {recovery}{' '}
                    classes continuously to
                    recover attendance.
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SafeBunk