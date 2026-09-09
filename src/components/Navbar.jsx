import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/resume.js'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#publications', label: 'Publications' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
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

        <div className="hidden md:flex items-center gap-8">
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

        <button
          className="md:hidden text-slate-200"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-panel border-b border-line px-6 py-4 flex flex-col gap-4">
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
