import {
  signInWithPopup
} from 'firebase/auth'

import {
  auth,
  googleProvider
} from '../../firebase'

import API from '../../api/api'

import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const loginWithGoogle =
    async () => {
      try {
        const result =
          await signInWithPopup(
            auth,
            googleProvider
          )

        const user = result.user

        const { data } =
          await API.post(
            '/auth/google',
            {
              email: user.email,
              name:
                user.displayName
            }
          )

        localStorage.setItem(
          'token',
          data.token
        )

        localStorage.setItem(
          'attendxUser',
          JSON.stringify({
            name:
              user.displayName,
            email: user.email,
            photo:
              user.photoURL
          })
        )

        navigate('/dashboard')
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-950 text-white p-6'>
      <div className='glass-card p-10 rounded-3xl w-full max-w-md text-center space-y-6'>
        <h1 className='text-4xl font-bold'>
          AttendX
        </h1>

        <p className='text-slate-400'>
          Smart Attendance Tracker
        </p>

        <button
          onClick={
            loginWithGoogle
          }
          className='w-full bg-blue-600 hover:bg-blue-700 transition-all py-4 rounded-2xl font-semibold text-lg'
        >
          Continue with Google
        </button>
      </div>
    </div>
  )
}

export default Login