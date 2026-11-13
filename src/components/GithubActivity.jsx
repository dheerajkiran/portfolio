import { useState } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { profile } from '../data/resume.js'

export default function GithubActivity() {
  const [failed, setFailed] = useState(false)

  return (
    <section id="github-activity" aria-labelledby="github-activity-title" className="relative py-20 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="rounded-2xl border border-line bg-panel/60 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="section-label text-xs text-cyan-glow mb-3">GitHub · Activity</p>
                <h2 id="github-activity-title" className="font-display text-2xl sm:text-3xl font-semibold text-slate-100">Building, one commit at a time.</h2>
                <p className="text-sm text-slate-400 mt-3">My contributions over the past year.</p>
              </div>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-cyan-glow hover:underline">
                <Github size={18} /> @dheerajkiran <ArrowUpRight size={16} />
              </a>
            </div>
            {failed ? (
              <p role="status" className="text-sm text-slate-400 py-8">The contribution calendar is temporarily unavailable. View my activity on GitHub using the link above.</p>
            ) : (
              <div className="overflow-x-auto pb-3">
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="View Dheeraj Kiran's contribution activity on GitHub">
                  <img
                    src="https://ghchart.rshah.org/5eead4/dheerajkiran"
                    alt="Dheeraj Kiran's GitHub contribution calendar for the past year"
                    width="900"
                    height="160"
                    className="w-full min-w-[720px] h-auto rounded-lg bg-white p-4"
                    loading="lazy"
                    onError={() => setFailed(true)}
                  />
                </a>
              </div>
            )}
            <p className="text-xs text-slate-500 mt-4">Synced from GitHub · Calendar refreshes daily.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
