import { useEffect, useState } from 'react'

import API from '../../api/api'

function Predictor() {
  const [subjects, setSubjects] = useState([])

  const [selectedSubject, setSelectedSubject] =
    useState(null)

  const [futureClasses, setFutureClasses] =
    useState(0)

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    try {
      const { data } = await API.get(
        '/subjects'
      )

      setSubjects(data)

      if (data.length > 0) {
        setSelectedSubject(data[0])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const predictAttendance = (
    type
  ) => {
    if (!selectedSubject) return 0

    let attended =
      selectedSubject.attendedClasses

    let total =
      selectedSubject.totalClasses

    if (type === 'attend') {
      attended += Number(futureClasses)

      total += Number(futureClasses)
    }

    if (type === 'miss') {
      total += Number(futureClasses)
    }

    return (
      ((attended / total) * 100) || 0
    ).toFixed(2)
  }

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div>
        <h1 className='text-4xl font-bold'>
          Attendance Predictor
        </h1>

        <p className='text-slate-400 mt-2'>
          Simulate your future attendance
        </p>
      </div>

      {/* Subject Select */}
      <div className='glass-card p-6 rounded-2xl space-y-5'>
        <select
          className='w-full p-4 rounded-xl bg-slate-800'
          onChange={(e) => {
            const subject =
              subjects.find(
                (s) =>
                  s._id === e.target.value
              )

            setSelectedSubject(subject)
          }}
        >
          {subjects.map((subject) => (
            <option
              key={subject._id}
              value={subject._id}
            >
              {subject.subjectName}
            </option>
          ))}
        </select>

        <input
          type='number'
          placeholder='Enter future classes'
          className='w-full p-4 rounded-xl bg-slate-800'
          value={futureClasses}
          onChange={(e) =>
            setFutureClasses(e.target.value)
          }
        />
      </div>

      {/* Prediction Cards */}
      {selectedSubject && (
        <div className='grid md:grid-cols-2 gap-6'>
          {/* Attend */}
          <div className='bg-green-500/10 border border-green-500 p-6 rounded-2xl'>
            <h2 className='text-2xl font-bold text-green-400'>
              If You Attend
            </h2>

            <p className='text-6xl font-bold mt-6'>
              {predictAttendance(
                'attend'
              )}
              %
            </p>

            <p className='text-slate-400 mt-4'>
              Future attendance after
              attending next{' '}
              {futureClasses} classes
            </p>
          </div>

          {/* Miss */}
          <div className='bg-red-500/10 border border-red-500 p-6 rounded-2xl'>
            <h2 className='text-2xl font-bold text-red-400'>
              If You Miss
            </h2>

            <p className='text-6xl font-bold mt-6'>
              {predictAttendance('miss')}
              %
            </p>

            <p className='text-slate-400 mt-4'>
              Future attendance after
              missing next {futureClasses}{' '}
              classes
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Predictor