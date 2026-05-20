import { useEffect, useState } from 'react'

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

import API from '../../api/api'

function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get(
        '/dashboard'
      )

      setStats(data)
    } catch (error) {
      console.log(error)
    }
  }

  if (!stats) {
    return (
      <div className='text-2xl'>
        Loading...
      </div>
    )
  }

  const pieData = [
    {
      name: 'Attended',
      value: stats.attendedClasses,
    },
    {
      name: 'Missed',
      value: stats.missedClasses,
    },
  ]

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div>
        <h1 className='text-4xl font-bold'>
          Dashboard
        </h1>

        <p className='text-slate-400 mt-2'>
          Smart attendance overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-6'>
        <div className='glass-card p-6 rounded-2xl'>
          <p className='text-slate-400'>
            Overall Attendance
          </p>

          <h2 className='text-5xl font-bold text-green-400 mt-4'>
            {stats.overallPercentage}%
          </h2>
        </div>

        <div className='glass-card p-6 rounded-2xl'>
          <p className='text-slate-400'>
            Total Classes
          </p>

          <h2 className='text-5xl font-bold text-blue-400 mt-4'>
            {stats.totalClasses}
          </h2>
        </div>

        <div className='glass-card p-6 rounded-2xl'>
          <p className='text-slate-400'>
            Attended
          </p>

          <h2 className='text-5xl font-bold text-purple-400 mt-4'>
            {stats.attendedClasses}
          </h2>
        </div>

        <div className='glass-card p-6 rounded-2xl'>
          <p className='text-slate-400'>
            Missed
          </p>

          <h2 className='text-5xl font-bold text-red-400 mt-4'>
            {stats.missedClasses}
          </h2>
        </div>
      </div>

      {/* Charts */}
      <div className='grid xl:grid-cols-2 gap-6'>
        {/* Pie Chart */}
        <div className='glass-card p-6 rounded-2xl h-[400px]'>
          <h2 className='text-2xl font-bold mb-5'>
            Attendance Overview
          </h2>

          <ResponsiveContainer
            width='100%'
            height='100%'
          >
            <PieChart>
              <Pie
                data={pieData}
                dataKey='value'
                outerRadius={120}
              >
                <Cell fill='#22c55e' />

                <Cell fill='#ef4444' />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Chart */}
        <div className='glass-card p-6 rounded-2xl h-[400px]'>
          <h2 className='text-2xl font-bold mb-5'>
            Subject Comparison
          </h2>

          <ResponsiveContainer
            width='100%'
            height='100%'
          >
            <BarChart
              data={stats.subjects}
            >
              <XAxis
                dataKey='subjectName'
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey='percentage'
                fill='#3b82f6'
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard