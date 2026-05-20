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

        {/* Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className='flex flex-col items-center text-xs text-slate-400'
        >
          <Menu size={20} />
          <span>Menu</span>
        </button>
      </div>

      {/* Menu Overlay */}
      {open && (
        <div className='md:hidden fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex flex-col'>
          {/* Header */}
          <div className='flex items-center justify-between p-5 border-b border-white/10'>
            <h2 className='text-2xl font-bold text-white'>
              AttendX Menu
            </h2>

            <button
              onClick={() => setOpen(false)}
              className='text-white'
            >
              <X size={28} />
            </button>
          </div>

          {/* Menu Items */}
          <div className='flex flex-col p-5 gap-4'>
            {menuItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 p-4 rounded-2xl text-lg ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'glass-card text-slate-300'
                    }`
                  }
                >
                  <Icon size={24} />
                  <span>{item.name}</span>
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