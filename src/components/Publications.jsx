import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { publications, certifications } from '../data/resume.js'
import { FileText, Award } from 'lucide-react'

export default function Publications() {
  return (
    <section id="publications" className="relative py-28 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="05" subtitle="Publications & Certifications" title="Recognition" />

        <div className="grid md:grid-cols-2 gap-12">
          <Reveal>
            <p className="section-label text-xs text-slate-500 mb-5">PUBLICATIONS</p>
            <div className="space-y-4">
              {publications.map((p) => (
                <a
                  key={p.title}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex gap-4 border border-line rounded-2xl p-5 bg-panel/60 hover:border-cyan-glow/40 transition-colors"
                >
                  <div className="p-2.5 h-fit rounded-lg bg-cyan-glow/10 text-cyan-glow shrink-0">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-100 font-medium group-hover:text-cyan-glow transition-colors">
                      {p.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{p.venue}</p>
                    <p className="text-xs font-mono text-slate-600 mt-1">DOI: {p.doi}</p>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="section-label text-xs text-slate-500 mb-5">CERTIFICATIONS</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {certifications.map((c) => (
                <div
                  key={c.name}
                  className="flex gap-3 border border-line rounded-2xl p-4 bg-panel/60"
                >
                  <div className="p-2 h-fit rounded-lg bg-cyan-glow/10 text-cyan-glow shrink-0">
                    <Award size={16} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-200 leading-snug">{c.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{c.issuer}</p>
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
