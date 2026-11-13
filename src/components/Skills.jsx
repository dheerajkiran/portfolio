import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { skills } from '../data/resume.js'

function SkillsOverview() {
  const point = (i, radius) => {
    const angle = (i * 60 - 90) * Math.PI / 180
    return [250 + Math.cos(angle) * radius, 230 + Math.sin(angle) * radius]
  }
  const polygon = (radius) => skills.map((_, i) => point(i, radius).join(',')).join(' ')
  return (
    <Reveal className="h-full">
      <div className="h-full rounded-2xl border border-line bg-bg/60 p-5 sm:p-8 flex flex-col justify-center">
        <p className="section-label text-xs text-cyan-glow text-center mb-4">Toolkit overview</p>
        <svg viewBox="0 0 500 460" className="w-full max-w-xl mx-auto" role="img" aria-labelledby="toolkit-title toolkit-description">
          <title id="toolkit-title">Six areas of my technical toolkit</title>
          <desc id="toolkit-description">Programming, AI and ML, Frameworks and Libraries, Robotics, Cloud and Databases, and Tools. This diagram groups skills and does not represent proficiency scores.</desc>
          {[40, 80, 120, 160].map(radius => <polygon key={radius} points={polygon(radius)} fill="none" stroke="currentColor" className="text-slate-700" />)}
          {skills.map((group, i) => {
            const [x, y] = point(i, 160)
            const [labelX, labelY] = point(i, 200)
            const labels = [['Programming'], ['AI / ML'], ['Frameworks', '& Libraries'], ['Robotics'], ['Cloud &', 'Databases'], ['Tools']][i]
            return (
              <g key={group.group}>
                <line x1="250" y1="230" x2={x} y2={y} stroke="currentColor" className="text-slate-700" />
                <text x={labelX} y={labelY - (labels.length - 1) * 8} textAnchor="middle" dominantBaseline="middle" fill="currentColor" className="text-slate-300" fontSize="13">
                  {labels.map((label, j) => <tspan key={label} x={labelX} dy={j ? 18 : 0}>{label}</tspan>)}
                </text>
                <circle cx={x} cy={y} r="5" fill="#5eead4" />
              </g>
            )
          })}
          <polygon points={polygon(160)} fill="#5eead4" fillOpacity="0.08" stroke="#5eead4" strokeWidth="2" />
          <circle cx="250" cy="230" r="4" fill="#5eead4" />
        </svg>
        <p className="text-xs text-slate-500 text-center">Six connected disciplines behind my work.</p>
      </div>
    </Reveal>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 bg-panel/40 border-y border-line">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="02" subtitle="Skills" title="Technical Toolkit" />

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <SkillsOverview />
          <div className="grid sm:grid-cols-2 gap-5">
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
      </div>
    </section>
  )
}
