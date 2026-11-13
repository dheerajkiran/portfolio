import { useEffect, useState } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { profile } from '../data/resume.js'

const activityUrl = 'https://github-contributions-api.jogruber.de/v4/dheerajkiran?y=last'
const levels = ['fill-line', 'fill-cyan-glow/20', 'fill-cyan-glow/40', 'fill-cyan-glow/70', 'fill-cyan-glow']
const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' })
const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' })

function ContributionCalendar({ days }) {
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay()
  const weeks = Math.ceil((offset + days.length) / 7)
  const step = 18
  const left = 42
  const top = 28
  const months = []

  days.forEach((day, index) => {
    const date = new Date(`${day.date}T00:00:00Z`)
    const week = Math.floor((index + offset) / 7)
    if ((index === 0 || date.getUTCDate() === 1) && week < weeks - 1) {
      // Skip an initial partial month if its label would overlap the next month.
      if (months.length && week - months.at(-1).week < 3) months.pop()
      months.push({ date: day.date, label: monthFormat.format(date), week })
    }
  })

  return (
    <div tabIndex={0} role="region" aria-label="Scrollable GitHub contribution calendar" className="overflow-x-auto pb-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-glow">
      <svg viewBox={`0 0 ${left + weeks * step} 154`} className="w-full min-w-[760px] font-mono text-[11px] text-slate-400" role="img" aria-labelledby="contribution-calendar-title contribution-calendar-description">
        <title id="contribution-calendar-title">GitHub contributions over the past year</title>
        <desc id="contribution-calendar-description">{days.reduce((sum, day) => sum + day.count, 0).toLocaleString('en-US')} contributions. Brighter cyan cells indicate more contributions. View the full activity on GitHub using the profile link above.</desc>
        {months.map(month => (
          <text key={month.date} x={left + month.week * step} y="12" fill="currentColor">{month.label}</text>
        ))}
        {['Mon', 'Wed', 'Fri'].map((label, index) => (
          <text key={label} x="0" y={top + (index * 2 + 1) * step + 11} fill="currentColor">{label}</text>
        ))}
        {days.map((day, index) => (
          <rect
            key={day.date}
            x={left + Math.floor((index + offset) / 7) * step}
            y={top + ((index + offset) % 7) * step}
            width="14"
            height="14"
            rx="3"
            className={`${levels[day.level]} hover:stroke-slate-100`}
          >
            <title>{day.count} {day.count === 1 ? 'contribution' : 'contributions'} on {dateFormat.format(new Date(`${day.date}T00:00:00Z`))}</title>
          </rect>
        ))}
      </svg>
    </div>
  )
}

export default function GithubActivity() {
  const [days, setDays] = useState(null)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    const timeout = setTimeout(() => controller.abort(), 10000)
    setFailed(false)

    async function loadActivity() {
      try {
        const response = await fetch(activityUrl, { signal: controller.signal })
        if (!response.ok) throw new Error('Contribution request failed')
        const data = await response.json()
        if (!Array.isArray(data.contributions) || !data.contributions.length || data.contributions.some(day => (
          !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
          !Number.isFinite(Date.parse(`${day.date}T00:00:00Z`)) ||
          !Number.isInteger(day.count) || day.count < 0 ||
          !Number.isInteger(day.level) || day.level < 0 || day.level > 4
        ))) throw new Error('Invalid contribution data')
        if (active) setDays([...data.contributions].sort((a, b) => a.date.localeCompare(b.date)))
      } catch {
        if (active) setFailed(true)
      } finally {
        clearTimeout(timeout)
      }
    }

    loadActivity()
    return () => {
      active = false
      clearTimeout(timeout)
      controller.abort()
    }
  }, [attempt])

  return (
    <section id="github-activity" aria-labelledby="github-activity-title" className="relative py-20 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-panel/60 p-6 sm:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-glow/5 blur-3xl" />
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="section-label text-xs text-cyan-glow mb-3">GitHub · Activity</p>
                <h2 id="github-activity-title" className="font-display text-2xl sm:text-3xl font-semibold text-slate-100">Building, one commit at a time.</h2>
                <p className="text-sm text-slate-400 mt-3">My contributions over the past year.</p>
              </div>
              <a href={profile.github} target="_blank" rel="noreferrer" className="relative inline-flex items-center gap-2 rounded-full border border-cyan-glow/20 bg-cyan-glow/5 px-4 py-2.5 text-sm text-cyan-glow transition-colors hover:border-cyan-glow/50 hover:bg-cyan-glow/10">
                <Github size={18} /> @dheerajkiran <ArrowUpRight size={16} />
              </a>
            </div>
            {failed ? (
              <div role="status" className="rounded-xl border border-line bg-bg/60 p-6 text-sm text-slate-400">
                <p>The contribution calendar is temporarily unavailable. View my activity on GitHub using the link above.</p>
                <button type="button" onClick={() => setAttempt(value => value + 1)} className="mt-3 text-cyan-glow hover:underline">Try again</button>
              </div>
            ) : days ? (
              <div className="relative rounded-xl border border-line bg-bg/60 p-4 sm:p-6">
                <p className="mb-6 text-sm text-slate-400"><span className="mr-2 font-display text-2xl font-semibold text-cyan-glow">{days.reduce((sum, day) => sum + day.count, 0).toLocaleString('en-US')}</span>contributions in the last year</p>
                <ContributionCalendar days={days} />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-xs text-slate-500">
                  <span>Contributions on GitHub</span>
                  <div className="flex items-center gap-2" aria-label="Contribution intensity from less to more">
                    <span>Less</span>
                    <svg width="86" height="14" aria-hidden="true">
                      {levels.map((color, index) => <rect key={color} x={index * 18} width="14" height="14" rx="3" className={color} />)}
                    </svg>
                    <span>More</span>
                  </div>
                </div>
              </div>
            ) : (
              <div role="status" className="flex min-h-[240px] items-center justify-center rounded-xl border border-line bg-bg/60 text-sm text-slate-400">
                Loading GitHub activity…
              </div>
            )}
            <p className="text-xs text-slate-500 mt-4">Synced from GitHub · Recent contributions may take time to appear.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
