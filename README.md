# Mayank Pratap Singh — Portfolio

A light-themed, responsive personal portfolio built with plain HTML, CSS and JavaScript (no build step needed).

## Structure
```
index.html                  Page markup (Home, About, Skills, Projects, Contact)
css/styles.css               Main site styling and design tokens
js/script.js                 Interactivity: nav, scroll reveal, typing effect, canvas animation, project/skill data
projects/voyx-dashboard/              VOYX — Sales Performance Dashboard (single-file, Supabase-backed)
projects/resume-portfolio-generator/ AI Resume-to-Portfolio Generator (Gemini-powered)
```

## The featured projects
Clicking a card on the main site opens the real project, not a screenshot:

- **VOYX — Sales Performance Dashboard** (`projects/voyx-dashboard/`) — a single-file, real-time analytics dashboard with live KPI cards, a sales leaderboard, destination breakdowns, and CSV export, backed by Supabase and charted with Chart.js. Fully client-side and works as-is.
- **AI Resume-to-Portfolio Generator** (`projects/resume-portfolio-generator/`) — paste a resume and get a themeable portfolio back, powered by Google's Gemini API.

> **Note on the AI Resume-to-Portfolio Generator:** it calls a Python serverless endpoint (`api/generate.py`) that needs a `GEMINI_API_KEY` and a host that runs Python functions (e.g. Vercel). Opening its `index.html` directly will load the UI, but the "Generate Portfolio" button will only work once that piece is deployed with the API key set as an environment variable. VOYX is fully client-side and works immediately with no setup.

## Adding more projects
Open `js/script.js` and edit the `PROJECTS` array near the top:

```js
const PROJECTS = [
  {
    title: "Your Project Name",
    desc: "One or two sentence description.",
    tags: ["Python", "ML"],
    link: "projects/your-project/index.html"   // or an external GitHub/demo URL
  },
  ...
];
```

The grid adjusts automatically to however many you add.

## Deploying to Vercel
**Option A — Vercel CLI**
```
npm i -g vercel
cd portfolio
vercel
```

**Option B — GitHub + Vercel dashboard**
1. Push this folder to a new GitHub repo.
2. Go to vercel.com → New Project → Import the repo.
3. Framework preset: "Other" (it's a static site, no build command needed).
4. Deploy.

## Notes
- Update the LinkedIn URL in `index.html` (currently a placeholder) once you have your real profile link.
- Fonts (Space Grotesk, Inter, JetBrains Mono) and skill icons (Devicon) load from CDNs — no local install needed.
