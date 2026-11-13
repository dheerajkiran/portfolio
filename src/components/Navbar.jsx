import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { profile } from '../data/resume.js'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#publications', label: 'Publications' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/80 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-display font-semibold text-slate-100 tracking-tight">
          D<span className="text-gradient">.</span>Enna
        </a>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="section-label text-xs text-slate-400 hover:text-cyan-glow transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            download
            className="section-label text-xs px-4 py-2 rounded-full border border-cyan-glow/40 text-cyan-glow hover:bg-cyan-glow/10 transition-colors"
          >
            Resume
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-panel/60 text-slate-300 transition-colors hover:border-cyan-glow/50 hover:text-cyan-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-glow"
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <button
            type="button"
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center text-slate-200"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-navigation" className="lg:hidden bg-panel border-b border-line px-6 py-4 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="section-label text-xs text-slate-300"
            >
              {l.label}
            </a>
          ))}
          <a href={profile.resumeUrl} download className="section-label text-xs text-cyan-glow">
            Resume
          </a>
        </div>
      )}
    </header>
  )
}
