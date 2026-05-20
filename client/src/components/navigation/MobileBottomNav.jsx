import { useState } from 'react'

import {
  LayoutDashboard,
  ClipboardCheck,
  Calendar,
  Menu,
  X,
  CalendarDays,
  BarChart3,
  Brain,
  ShieldCheck,
  User,
  Settings
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

function MobileBottomNav() {
  const [open, setOpen] = useState(false)

  const mainNav = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Attendance',
      path: '/attendance',
      icon: ClipboardCheck
    },
    {
      name: 'Calendar',
      path: '/calendar',
      icon: Calendar
    }
  ]

  const menuItems = [
    {
      name: 'Timetable',
      path: '/timetable',
      icon: CalendarDays
    },
    {
      name: 'Analytics',
      path: '/analytics',
      icon: BarChart3
    },
    {
      name: 'Predictor',
      path: '/predictor',
      icon: Brain
    },
    {
      name: 'Safe Bunk',
      path: '/safe-bunk',
      icon: ShieldCheck
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: User
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings
    }
  ]

  return (
    <>
      {/* Bottom Nav */}
      <div className='md:hidden fixed bottom-0 left-0 right-0 glass-card border-t border-white/10 flex justify-around py-3 z-50'>
        {mainNav.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center text-xs ${
                  isActive
                    ? 'text-blue-400'
                    : 'text-slate-400'
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          )
        })}

        <button
          onClick={() => setOpen(true)}
          className='flex flex-col items-center text-xs text-slate-400'
        >
          <Menu size={20} />
          <span>Menu</span>
        </button>
      </div>

      {/* Full Menu */}
      {open && (
        <div className='md:hidden fixed inset-0 bg-black/80 backdrop-blur-xl z-50'>
          <div className='flex items-center justify-between p-5 border-b border-white/10'>
            <h2 className='text-2xl font-bold'>
              AttendX
            </h2>

            <button
              onClick={() => setOpen(false)}
            >
              <X size={28} />
            </button>
          </div>

          <div className='p-5 flex flex-col gap-4'>
            {menuItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() =>
                    setOpen(false)
                  }
                  className={({ isActive }) =>
                    `flex items-center gap-4 p-4 rounded-2xl ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'glass-card text-slate-300'
                    }`
                  }
                >
                  <Icon size={22} />
                  <span>
                    {item.name}
                  </span>
                </NavLink>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default MobileBottomNav