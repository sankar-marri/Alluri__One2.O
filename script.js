const phases = [
  ['Planning & Preparation', '1–2'],
  ['Core Infrastructure', '3–4'],
  ['User Management', '5–6'],
  ['Citizen Services', '7–12'],
  ['Governance & Benefits', '13–16'],
  ['Administration & Officials', '17–20'],
  ['Jobs & Opportunities', '21–24'],
  ['Relevance & Support', '25–28'],
  ['AI & Launch', '29–36']
];

const palette = ['#4d78d8', '#29a0bd', '#a5a7ef', '#6e7adf', '#5fc4c9', '#d77d45', '#6d8fd3', '#6fa2c9', '#b28ad9'];
const list = document.querySelector('#roadmapList');

phases.forEach(([name, weeks], index) => {
  const card = document.createElement('article');
  card.className = 'phase';
  card.style.setProperty('--phase', palette[index]);
  card.tabIndex = 0;
  card.innerHTML = `
    <div class="phase-index">${index === 8 ? 'AI' : String(index).padStart(2, '0')}</div>
    <h3>${name}</h3>
    <div class="phase-weeks">Weeks ${weeks}</div>
  `;
  card.addEventListener('click', () => {
    document.querySelectorAll('.phase').forEach(item => item.classList.remove('active'));
    card.classList.add('active');
  });
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') card.click();
  });
  list.appendChild(card);
});

const dialog = document.querySelector('#introDialog');
document.querySelector('#watchIntro').addEventListener('click', () => dialog.showModal());
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.count);
    let value = 0;
    const timer = setInterval(() => {
      value += Math.ceil(target / 30);
      if (value >= target) {
        value = target;
        clearInterval(timer);
      }
      element.textContent = value;
    }, 30);
    counterObserver.unobserve(element);
  });
}, { threshold: 0.5 });
counters.forEach(counter => counterObserver.observe(counter));
