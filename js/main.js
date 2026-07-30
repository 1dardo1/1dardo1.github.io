// ===== Theme toggle (claro/oscuro con persistencia) =====
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');

function syncThemeIcons() {
  const isDark = root.classList.contains('dark');
  iconSun.classList.toggle('hidden', !isDark);
  iconMoon.classList.toggle('hidden', isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
}

syncThemeIcons();

themeToggle.addEventListener('click', () => {
  root.classList.toggle('dark');
  localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
  syncThemeIcons();
});

// ===== Menú móvil =====
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const iconMenu = document.getElementById('icon-menu');
const iconClose = document.getElementById('icon-close');

menuToggle.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  mobileMenu.classList.toggle('flex');
  iconMenu.classList.toggle('hidden', !isOpen);
  iconClose.classList.toggle('hidden', isOpen);
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Reloj de experiencia profesional en tiempo real =====
const EXPERIENCE_START = new Date('2026-02-02T00:00:00');
const experienceClock = document.getElementById('experience-clock');

function getElapsed(start, now) {
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) { months += 12; years--; }

  return { years, months, days, hours, minutes, seconds };
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function renderExperienceClock() {
  const now = new Date();
  if (now < EXPERIENCE_START) {
    experienceClock.textContent = 'Próximamente';
    return;
  }

  const { years, months, days, hours, minutes, seconds } = getElapsed(EXPERIENCE_START, now);
  const parts = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'año' : 'años'}`);
  parts.push(`${months} ${months === 1 ? 'mes' : 'meses'}`);
  parts.push(`${days} ${days === 1 ? 'día' : 'días'}`);

  experienceClock.textContent = `${parts.join(', ')} · ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

renderExperienceClock();
setInterval(renderExperienceClock, 1000);

// ===== Año dinámico en el footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Proyectos =====
// Añade aquí cada proyecto cuando esté listo. Estructura preparada, se
// renderiza automáticamente y el estado vacío desaparece solo.
const projects = [
  // {
  //   title: 'Nombre del proyecto',
  //   description: 'Qué problema resuelve.',
  //   role: 'Tu rol y contribución concreta.',
  //   stack: ['C#', '.NET', 'Angular'],
  //   repoUrl: 'https://github.com/1dardo1/...',
  //   demoUrl: '',
  //   image: '',
  // },
];

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  const emptyState = document.getElementById('projects-empty');

  if (!projects.length) {
    grid.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  grid.classList.remove('hidden');

  grid.innerHTML = projects
    .map(
      (project) => `
      <article class="project-card">
        ${
          project.image
            ? `<img src="${project.image}" alt="Captura de ${project.title}" class="w-full h-44 object-cover" loading="lazy">`
            : ''
        }
        <div class="p-6 flex flex-col gap-3 flex-1">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">${project.title}</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400">${project.description}</p>
          <p class="text-sm text-slate-500 dark:text-slate-500"><strong>Rol:</strong> ${project.role}</p>
          <div class="flex flex-wrap gap-2 mt-1">
            ${project.stack.map((tech) => `<span class="badge">${tech}</span>`).join('')}
          </div>
          <div class="mt-auto pt-4 flex gap-3">
            ${project.repoUrl ? `<a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary !py-2 !px-4 !text-sm">Código</a>` : ''}
            ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary !py-2 !px-4 !text-sm">Demo</a>` : ''}
          </div>
        </div>
      </article>
    `
    )
    .join('');
}

renderProjects();
