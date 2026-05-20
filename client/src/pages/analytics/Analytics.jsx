import { useEffect, useState } from 'react'

import API from '../../api/api'

function Analytics() {
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

  const getColor = (percentage) => {
    if (percentage >= 75)
      return 'text-green-400'

    if (percentage >= 70)
      return 'text-yellow-400'

    return 'text-red-400'
  }

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-4xl font-bold'>
          Subject Analytics
        </h1>

        <p className='text-slate-400 mt-2'>
          Track attendance percentages
        </p>
      </div>

      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
        {subjects.map((subject) => (
          <div
            key={subject._id}
            className='glass-card p-6 rounded-2xl'
          >
            <h2 className='text-2xl font-bold'>
              {subject.subjectName}
            </h2>

            <div className='mt-5 space-y-2'>
              <p>
                Total Classes:{' '}
                {subject.totalClasses}
              </p>

              <p>
                Attended:{' '}
                {subject.attendedClasses}
              </p>

              <p
                className={`text-3xl font-bold ${getColor(
                  subject.percentage
                )}`}
              >
                {subject.percentage}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Analytics