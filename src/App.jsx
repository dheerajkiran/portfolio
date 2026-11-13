import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Publications from './components/Publications.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import GithubActivity from './components/GithubActivity.jsx'
import useTheme from './hooks/useTheme.js'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="bg-bg min-h-screen font-body">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Hero theme={theme} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Publications />
      <GithubActivity />
      <Contact />
      <Footer />
    </div>
  )
}
