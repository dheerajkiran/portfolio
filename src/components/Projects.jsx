import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { projects } from '../data/resume.js'
import { ArrowUpRight } from 'lucide-react'

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="03" subtitle="Projects" title="Selected Work" />

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <article className="group relative h-full flex flex-col border border-line rounded-2xl p-6 bg-panel/60 hover:bg-panel transition-colors hover:border-cyan-glow/40 overflow-hidden">
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-cyan-glow/5 blur-3xl group-hover:bg-cyan-glow/10 transition-colors" />

                <div className="flex items-center justify-between mb-4">
                  <span className="section-label text-[10px] text-cyan-glow px-2.5 py-1 rounded-full border border-cyan-glow/30">
                    {p.tag}
                  </span>
                  <span className="section-label text-[10px] text-slate-500">{p.date}</span>
                </div>

                <h3 className="font-display text-lg font-semibold text-slate-100 mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{p.summary}</p>

                <ul className="space-y-2 mb-6 text-sm text-slate-400">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-cyan-glow mt-1.5 shrink-0">
                        <ArrowUpRight size={11} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-line">
                  {p.stack.map((s) => (
                    <span key={s} className="text-xs text-slate-500 font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
