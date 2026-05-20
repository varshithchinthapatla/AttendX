import { useTheme } from 'next-themes'

function ThemeToggle() {
  const { theme, setTheme } =
    useTheme()

  return (
    <button
      onClick={() =>
        setTheme(
          theme === 'dark'
            ? 'light'
            : 'dark'
        )
      }
      className='bg-slate-800 px-4 py-2 rounded-xl'
    >
      {theme === 'dark'
        ? '☀️ Light'
        : '🌙 Dark'}
    </button>
  )
}

export default ThemeToggle