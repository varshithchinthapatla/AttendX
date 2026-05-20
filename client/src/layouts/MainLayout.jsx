import { Outlet } from 'react-router-dom'

import Sidebar from '../components/layout/Sidebar'
import Navbar from '../components/layout/Navbar'
import ThemeToggle from '../components/ThemeToggle'
import MobileBottomNav from '../components/navigation/MobileBottomNav'

function MainLayout() {
  return (
    <div className='min-h-screen bg-slate-950 text-white md:flex'>
      <Sidebar />

      <div className='flex-1 flex flex-col'>
        <ThemeToggle />
        <Navbar />

        <main className='p-4 sm:p-6 overflow-auto mobile-safe pb-24'>
          <Outlet />
        </main>

        <MobileBottomNav />
      </div>
    </div>
  )
}

export default MainLayout