import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { profile, education } from '../data/resume.js'
import { GraduationCap } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="01" subtitle="About" title="Background" />

        <div className="grid md:grid-cols-5 gap-12">
          <Reveal className="md:col-span-3" delay={0.05}>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
              {profile.tagline} My work spans{' '}
              <span className="text-slate-100">deep learning</span>,{' '}
              <span className="text-slate-100">real-time perception</span>, and{' '}
              <span className="text-slate-100">LLM-driven applications</span> — from
              assistive vision hardware to autonomous perception pipelines, grounded in
              cloud infrastructure and production-style engineering.
            </p>
          </Reveal>

          <Reveal className="md:col-span-2" delay={0.15}>
            <div className="space-y-6">
              {education.map((e) => (
                <div key={e.school} className="border border-line rounded-2xl p-5 bg-panel/60">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyan-glow/10 text-cyan-glow shrink-0">
                      <GraduationCap size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-100 font-medium">{e.school}</p>
                      <p className="text-sm text-slate-400 mt-0.5">{e.degree}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                        <span className="section-label">{e.date}</span>
                        <span>·</span>
                        <span>{e.location}</span>
                        <span>·</span>
                        <span className="text-cyan-glow/80">{e.detail}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
