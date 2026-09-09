import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { experience } from '../data/resume.js'

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6 bg-panel/40 border-y border-line">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="04" subtitle="Experience" title="Where I've Worked" />

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-line" />

          <div className="space-y-12">
            {experience.map((e, i) => (
              <Reveal key={e.role} delay={i * 0.1} className="relative">
                <span className="absolute -left-8 sm:-left-10 top-1.5 w-3.5 h-3.5 rounded-full bg-bg border-2 border-cyan-glow shadow-glow" />

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
                  <h3 className="font-display text-lg font-semibold text-slate-100">{e.role}</h3>
                  <span className="section-label text-xs text-slate-500">{e.date}</span>
                </div>
                <p className="text-sm text-cyan-glow/80 mb-4">{e.org}</p>
                <ul className="space-y-2">
                  {e.bullets.map((b) => (
                    <li key={b} className="text-sm text-slate-400 leading-relaxed flex gap-2">
                      <span className="text-slate-600 mt-0.5">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
