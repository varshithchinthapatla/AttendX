import { useEffect, useState } from 'react'

function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem('user')) || {
        name: 'AttendX User',
        email: 'student@attendx.com',
        college: 'Engineering College',
        branch: 'CSE'
      }

    setUser(storedUser)
  }, [])

  if (!user) {
    return (
      <div className='text-2xl'>
        Loading Profile...
      </div>
    )
  }

  return (
    <div className='space-y-6 pb-24'>
      <div>
        <h1 className='text-4xl font-bold'>
          Profile
        </h1>

        <p className='text-slate-400 mt-2'>
          Your student profile
        </p>
      </div>

      <div className='glass-card rounded-3xl p-6 space-y-5'>
        <div className='flex flex-col items-center'>
          <div className='w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold'>
            {user.name?.charAt(0)}
          </div>

          <h2 className='text-2xl font-bold mt-4'>
            {user.name}
          </h2>

          <p className='text-slate-400'>
            {user.email}
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-4'>
          <div className='glass-card rounded-2xl p-4'>
            <p className='text-slate-400 text-sm'>
              College
            </p>

            <h3 className='text-xl font-semibold mt-1'>
              {user.college}
            </h3>
          </div>

          <div className='glass-card rounded-2xl p-4'>
            <p className='text-slate-400 text-sm'>
              Branch
            </p>

            <h3 className='text-xl font-semibold mt-1'>
              {user.branch}
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile