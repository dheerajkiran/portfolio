import { useEffect, useState } from 'react'

export default function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#f6f8fa' : '#05070a'
  }, [theme])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem('portfolio-theme', next) } catch {
      // Keep the toggle working when the browser blocks persistent storage.
    }
  }

  return { theme, toggleTheme }
}
