import { useTheme } from 'next-themes'

function Settings() {
  const { theme, setTheme } =
    useTheme()

  const logout = () => {
    localStorage.removeItem('token')

    localStorage.removeItem('user')

    window.location.href = '/login'
  }

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div>
        <h1 className='text-4xl font-bold'>
          Settings
        </h1>

        <p className='text-slate-400 mt-2'>
          Customize AttendX
        </p>
      </div>

      {/* Theme */}
      <div className='glass-card p-6 rounded-2xl flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>
            Theme
          </h2>

          <p className='text-slate-400 mt-1'>
            Toggle dark/light mode
          </p>
        </div>

        <button
          onClick={() =>
            setTheme(
              theme === 'dark'
                ? 'light'
                : 'dark'
            )
          }
          className='bg-blue-500 px-5 py-3 rounded-xl'
        >
          {theme === 'dark'
            ? '☀️ Light'
            : '🌙 Dark'}
        </button>
      </div>

      {/* Notifications */}
      <div className='glass-card p-6 rounded-2xl flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>
            Notifications
          </h2>

          <p className='text-slate-400 mt-1'>
            Attendance reminders
          </p>
        </div>

        <input
          type='checkbox'
          className='w-6 h-6'
          defaultChecked
        />
      </div>

      {/* Logout */}
      <div className='glass-card p-6 rounded-2xl flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-red-400'>
            Logout
          </h2>

          <p className='text-slate-400 mt-1'>
            Sign out from AttendX
          </p>
        </div>

        <button
          onClick={logout}
          className='bg-red-500 px-5 py-3 rounded-xl'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Settings