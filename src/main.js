import './styles.css';
import anime from 'animejs';
import { initWorld } from './three-world.js';
import { skills, projects } from './data.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const { camState } = initWorld();

const term = document.getElementById('terminal');
const full = term.textContent; term.textContent = '';
if (!reduced) {
  const o = { i: 0 };
  anime({ targets: o, i: full.length, duration: 1300, easing: 'easeOutQuad', update: () => term.textContent = full.slice(0, Math.floor(o.i)) });
} else term.textContent = full;

if (!reduced) {
  anime.timeline({ easing: 'easeOutExpo' })
    .add({ targets: '.ticket', scale: [0.92, 1], rotate: [-2, 0], opacity: [0, 1], duration: 600 })
    .add({ targets: '.stamp', scale: [2.4, 1], rotate: [18, 6], opacity: [0, 1], duration: 450, easing: 'easeInQuad' }, '-=200')
    .add({ targets: '.hero-title .line', translateY: [44, 0], rotate: [1.2, 0], opacity: [0, 1], duration: 800, delay: anime.stagger(120) }, '-=250')
    .add({ targets: ['.lede', '.hero-actions', '.handnote'], translateY: [20, 0], opacity: [0, 1], duration: 650, delay: anime.stagger(100) }, '-=450')
    .add({ targets: '#squigglePath', strokeDashoffset: [600, 0], duration: 900, easing: 'easeInOutQuad' }, '-=600');
  // doodle wobble loop on ticket
  anime({ targets: '.ticket', rotate: [-0.6, 0.6], duration: 2600, direction: 'alternate', loop: true, easing: 'easeInOutSine', delay: 2500 });
} else {
  document.querySelectorAll('[data-reveal]').forEach(el => { el.style.opacity = 1; });
  const sq = document.getElementById('squigglePath'); if (sq) sq.style.strokeDashoffset = 0;
}

const grid = document.getElementById('skillGrid');
grid.innerHTML = skills.map(s => `<div class="skill" data-reveal><div class="top"><span>✎ ${s.name}</span><span>${s.pct}%</span></div><div class="bar"><div class="fill" data-pct="${s.pct}"></div></div><div class="mono" style="font-size:11px;margin-top:8px">${s.group}</div></div>`).join('');

document.getElementById('projectGrid').innerHTML = projects.map(p => `
  <article class="proj" data-reveal>
    <img src="${p.img}" alt="${p.title}" loading="lazy" />
    <div class="pad"><h3>${p.title}</h3><p>${p.desc}</p>
    <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
    <a href="${p.link}" ${p.link.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>Open file →</a></div>
  </article>`).join('');

const dives = {
  hero: { x: 0, y: 0.6, z: 9, rx: 0, ry: 0 },
  about: { x: -1.2, y: 0.3, z: 7.5, rx: 0.1, ry: 0.6 },
  skills: { x: 1.2, y: 0.1, z: 7, rx: -0.08, ry: 1.2 },
  projects: { x: 0, y: -0.4, z: 6.2, rx: 0.14, ry: 1.9 },
  journey: { x: 0.6, y: 0.4, z: 7.4, rx: 0, ry: 2.5 },
  contact: { x: 0, y: 0.6, z: 8.4, rx: 0, ry: 3.1 },
};
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.style.opacity = 1;
    if (!reduced) {
      anime({ targets: el, translateY: [26, 0], rotate: [el.classList.contains('t-item') || el.classList.contains('proj') ? 1.5 : 0, 0], scale: [0.97, 1], opacity: [0, 1], duration: 700, easing: 'easeOutExpo' });
      el.querySelectorAll('.fill').forEach(f => anime({ targets: f, width: f.dataset.pct + '%', duration: 1000, easing: 'easeOutExpo' }));
      if (dives[el.id] && window.__dive) anime({ targets: camState, ...dives[el.id], duration: 1400, easing: 'easeInOutQuad' });
    } else el.querySelectorAll('.fill').forEach(f => f.style.width = f.dataset.pct + '%');
    io.unobserve(el);
  });
}, { threshold: 0.15 });
document.querySelectorAll('[data-reveal], section.panel').forEach(el => io.observe(el));
