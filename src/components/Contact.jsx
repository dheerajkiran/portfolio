import Reveal from './Reveal.jsx'
import { profile } from '../data/resume.js'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6 bg-panel/40 border-t border-line overflow-hidden">
      <div className="absolute inset-0 grid-fade opacity-60" />
      <div className="max-w-4xl mx-auto text-center relative">
        <Reveal>
          <p className="section-label text-xs text-cyan-glow mb-5">06 · CONTACT</p>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-slate-50 mb-6">
            Let's build something <span className="text-gradient">intelligent</span>.
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-10">
            Open to roles and collaborations in robotics, computer vision, and applied AI.
            Reach out directly or connect below.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <a
              href={`mailto:${profile.email}`}
              className="px-6 py-3 rounded-full bg-cyan-glow text-bg font-medium text-sm hover:shadow-glow transition-shadow inline-flex items-center gap-2"
            >
              <Mail size={16} /> {profile.email}
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="px-6 py-3 rounded-full border border-line text-slate-300 font-medium text-sm hover:border-cyan-glow/60 transition-colors inline-flex items-center gap-2"
            >
              <Phone size={16} /> {profile.phone}
            </a>
          </div>

          <div className="flex items-center justify-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-full border border-line text-slate-400 hover:text-cyan-glow hover:border-cyan-glow/50 transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-full border border-line text-slate-400 hover:text-cyan-glow hover:border-cyan-glow/50 transition-colors"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
