import { profile } from '../data/resume.js'

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-line py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-600 font-mono">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="text-xs text-slate-600 font-mono">Built with React · Three.js</p>
      </div>
    </footer>
  )
}
