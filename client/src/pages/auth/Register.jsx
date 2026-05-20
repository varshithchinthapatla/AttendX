import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import API from '../../api/api'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await API.post('/auth/register', formData)

      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-950'>
      <form
        onSubmit={handleSubmit}
        className='glass-card p-10 rounded-3xl w-full max-w-md space-y-5'
      >
        <h1 className='text-4xl font-bold text-center text-blue-500'>
          AttendX
        </h1>

        <input
          type='text'
          name='name'
          placeholder='Name'
          className='w-full p-4 rounded-xl bg-slate-800 text-white'
          onChange={handleChange}
        />

        <input
          type='email'
          name='email'
          placeholder='Email'
          className='w-full p-4 rounded-xl bg-slate-800 text-white'
          onChange={handleChange}
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          className='w-full p-4 rounded-xl bg-slate-800 text-white'
          onChange={handleChange}
        />

        <button className='w-full bg-blue-600 p-4 rounded-xl hover:bg-blue-700'>
          Register
        </button>

        <p className='text-center text-slate-400'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-500'>
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register