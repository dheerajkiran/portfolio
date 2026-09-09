import Reveal from './Reveal.jsx'

export default function SectionHeading({ index, title, subtitle }) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-center gap-3 mb-3">
        <span className="section-label text-cyan-glow text-xs">{index}</span>
        <div className="h-px flex-1 max-w-[60px] bg-line" />
        <span className="section-label text-xs text-slate-500 uppercase">{subtitle}</span>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-100">{title}</h2>
    </Reveal>
  )
}
