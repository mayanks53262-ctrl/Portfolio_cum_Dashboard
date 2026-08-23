// ============================================
// PROJECT DATA
// Each project lives in its own folder under /projects
// and is a real, working app — clicking a card opens it.
// ============================================
const PROJECTS = [
  {
    title: "VOYX — Sales Performance Dashboard",
    desc: "A real-time sales analytics dashboard with live KPI cards, a sales leaderboard, destination breakdowns, and CSV export — backed by Supabase and charted with Chart.js.",
    tags: ["HTML", "JavaScript", "Supabase", "Chart.js"],
    link: "projects/voyx-dashboard/index.html"
  },
  {
    title: "AI Resume-to-Portfolio Generator",
    desc: "Paste resume text and get a live, themeable portfolio site back — parsed by Gemini into structured JSON and rendered into four swappable visual themes.",
    tags: ["Python", "Gemini API", "HTML/CSS/JS"],
    link: "projects/resume-portfolio-generator/index.html"
  }
];

const GRADIENTS = [
  "linear-gradient(135deg, #DB2777, #7C3AED)",
  "linear-gradient(135deg, #F59E0B, #10B981)",
  "linear-gradient(135deg, #2563EB, #06B6D4)",
  "linear-gradient(135deg, #DC2626, #F97316)"
];

// ============================================
// SKILLS DATA
// ============================================
const SKILLS = [
  { name: "Python", icon: "devicon-python-plain colored" },
  { name: "Java", icon: "devicon-java-plain colored" },
  { name: "HTML5", icon: "devicon-html5-plain colored" },
  { name: "CSS3", icon: "devicon-css3-plain colored" },
  { name: "SQL", icon: "devicon-mysql-plain colored" },
  { name: "Pandas", icon: "devicon-pandas-plain colored" }
];

// ============================================
// RENDER: SKILLS
// ============================================
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = SKILLS.map(skill => `
    <div class="skill-card reveal">
      <i class="${skill.icon}"></i>
      <span class="skill-name">${skill.name}</span>
    </div>
  `).join('');
}

// ============================================
// RENDER: PROJECTS
// ============================================
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = PROJECTS.map((p, i) => `
    <a class="project-card reveal" href="${p.link}" target="_blank" rel="noopener">
      <div class="project-thumb" style="background:${GRADIENTS[i % GRADIENTS.length]}">
        <span class="project-initial">${p.title.charAt(0)}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
        <div class="project-links">
          <span class="project-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
            Try it live
          </span>
        </div>
      </div>
    </a>
  `).join('');
}

// ============================================
// NAV: scroll state, scrollspy, mobile menu
// ============================================
function initNav() {
  const nav = document.getElementById('nav');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('[data-nav]');
  const navOffset = 76;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId.startsWith('#')) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navOffset + 1;
      window.scrollTo({ top, behavior: 'smooth' });
      mobileMenu.classList.remove('open');
      menuToggle.classList.remove('open');
    });
  });

  // Scrollspy
  const sections = document.querySelectorAll('main section[id]');
  const spyLinks = document.querySelectorAll('.nav-link');
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        spyLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(s => spyObserver.observe(s));
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ============================================
// REVEAL ON SCROLL
// ============================================
function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(t => observer.observe(t));
}

// ============================================
// TYPING EFFECT (hero role line)
// ============================================
function initTypedRole() {
  const el = document.getElementById('typedRole');
  const roles = ["AI / ML Enthusiast", "Python Developer", "Building with Data"];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    el.textContent = roles[0];
    return;
  }

  let roleIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1500);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }
  tick();
}

// ============================================
// HERO CANVAS: subtle neural-network animation
// ============================================
function initNetCanvas() {
  const canvas = document.getElementById('netCanvas');
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width, height, nodes;
  const NODE_COUNT_BASE = 5500; // px^2 per node, keeps density consistent
  const LINK_DIST = 140;

  function resize() {
    const hero = canvas.parentElement;
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
    const count = Math.min(70, Math.max(24, Math.floor((width * height) / NODE_COUNT_BASE)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          ctx.strokeStyle = `rgba(86, 71, 245, ${0.14 * (1 - dist / LINK_DIST)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      ctx.fillStyle = 'rgba(15, 181, 166, 0.45)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!reduceMotion) requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
}

// ============================================
// INIT
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

renderSkills();
renderProjects();
initNav();
initScrollProgress();
initReveal();
initTypedRole();
initNetCanvas();
