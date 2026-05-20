import {
  LayoutDashboard,
  CalendarDays,
  ClipboardCheck,
  BarChart3,
  Brain,
  ShieldCheck,
  Calendar,
  User,
  Settings
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

const menu = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Timetable',
    path: '/timetable',
    icon: CalendarDays
  },
  {
    name: 'Attendance',
    path: '/attendance',
    icon: ClipboardCheck
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
    name: 'Calendar',
    path: '/calendar',
    icon: Calendar
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

function Sidebar() {
  return (
    <aside className='hidden md:flex flex-col w-64 border-r border-slate-800 glass-card p-6'>
      <h1 className='text-3xl font-bold text-blue-500 mb-10'>
        AttendX
      </h1>

      <div className='flex flex-col gap-2'>
        {menu.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-slate-800 text-slate-300'
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          )
        })}
      </div>
    </aside>
  )
}

export default Sidebar