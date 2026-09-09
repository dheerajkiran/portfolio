import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { skills } from '../data/resume.js'

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 bg-panel/40 border-y border-line">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="02" subtitle="Skills" title="Technical Toolkit" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.06}>
              <div className="h-full border border-line rounded-2xl p-6 bg-bg/60 hover:border-cyan-glow/40 transition-colors">
                <p className="section-label text-xs text-cyan-glow mb-4">{group.group}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm text-slate-300 bg-line/40 border border-line rounded-full px-3 py-1"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
