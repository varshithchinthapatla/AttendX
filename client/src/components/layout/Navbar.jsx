function Navbar() {
  return (
    <div className='glass-card border-b border-white/10 px-4 py-4'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        
        {/* Left */}
        <div>
          <h1 className='text-2xl sm:text-3xl font-bold'>
            AttendX Dashboard
          </h1>

          <p className='text-slate-400 text-sm sm:text-base'>
            Smart attendance tracking
          </p>
        </div>

        {/* Right */}
        <button className='bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-xl text-sm sm:text-base self-start sm:self-auto'>
          Dark Mode
        </button>
      </div>
    </div>
  )
}

export default Navbar