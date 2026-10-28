# Dheeraj Kiran Enna — Portfolio

Personal portfolio for robotics and AI work, with an interactive 3D robotic-arm hero.

**Live site:** https://dheerajkiran.is-a.dev

## Tech stack

- [React 18](https://react.dev) + [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [drei](https://github.com/pmndrs/drei), and [postprocessing](https://github.com/pmndrs/react-postprocessing) for the 3D scene
- [Framer Motion](https://www.framer.com/motion/) for scroll animations
- [Lucide](https://lucide.dev) icons

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Updating content

All page content lives in [`src/data/resume.js`](src/data/resume.js): profile and contact links, education, skills, projects, experience, publications, and certifications. Edit that file and the sections update automatically.

To update the downloadable resume, replace [`public/Resume.pdf`](public/Resume.pdf).

## Project structure

```
src/
  components/
    Hero.jsx, Scene.jsx         # hero section and 3D canvas
    RoboticArm.jsx, ScanEffects.jsx
    About.jsx, Skills.jsx, Projects.jsx, Experience.jsx,
    Publications.jsx, Contact.jsx, Navbar.jsx, Footer.jsx
    Reveal.jsx, SectionHeading.jsx   # shared UI helpers
  data/resume.js                # site content
public/                         # resume PDF, avatar, favicon
```

## Deployment

Deployed on [Vercel](https://vercel.com). Pushes to `main` trigger a production build; build settings are pinned in [`vercel.json`](vercel.json).
