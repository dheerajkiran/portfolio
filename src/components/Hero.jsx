import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import Scene from './Scene.jsx'
import { profile } from '../data/resume.js'

export default function Hero() {
  return (
    <section id="top" className="relative h-screen min-h-[680px] w-full overflow-hidden bg-bg">
      <div className="absolute inset-0 grid-fade" />

      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/55 to-transparent sm:via-bg/35" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-bg to-transparent sm:hidden" />

      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-xl pointer-events-auto">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-label text-xs text-cyan-glow mb-5"
            >
              ROBOTICS &amp; AUTONOMOUS SYSTEMS · AI
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-6xl font-semibold leading-[1.05] text-slate-50"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-slate-400 leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="px-5 py-3 rounded-full bg-cyan-glow text-bg font-medium text-sm hover:shadow-glow transition-shadow"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-5 py-3 rounded-full border border-line text-slate-200 font-medium text-sm hover:border-cyan-glow/60 transition-colors"
              >
                Get in Touch
              </a>

              <div className="flex items-center gap-3 ml-1">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="p-2.5 rounded-full border border-line text-slate-400 hover:text-cyan-glow hover:border-cyan-glow/50 transition-colors"
                >
                  <Github size={17} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="p-2.5 rounded-full border border-line text-slate-400 hover:text-cyan-glow hover:border-cyan-glow/50 transition-colors"
                >
                  <Linkedin size={17} />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="p-2.5 rounded-full border border-line text-slate-400 hover:text-cyan-glow hover:border-cyan-glow/50 transition-colors"
                >
                  <Mail size={17} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-glow transition-colors"
      >
        <span className="section-label text-[10px]">SCROLL</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  )
}
