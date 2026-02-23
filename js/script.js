// ================================
// AUTO GENERATE CARDS FROM DATA
// ================================
function generateCard(project, basePath = '') {
  const imageSrc = project.image ? `${basePath}${project.image}` : null;
  return `
    <a href="${basePath}projects/${project.id}.html" class="work-card">
      <div class="work-image">
        ${imageSrc ? `<img src="${imageSrc}" alt="${project.title}"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : ''}
        <div class="work-placeholder" style="${imageSrc ? 'display:none' : ''}">
          ${project.placeholder || '📁'}
        </div>
      </div>
      <div class="work-info">
        <div class="work-info-left">
          <h3>${project.title}</h3>
          <p>${project.category}</p>
        </div>
        <i class="fas fa-arrow-right work-arrow"></i>
      </div>
    </a>
  `;
}

// ====================================
// THEME TOGGLE
// ====================================
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const body = document.body;
  const themeIcon = themeToggle.querySelector('i');
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('theme', 'light');
    }
  });
}

// ====================================
// HAMBURGER MENU
// ====================================
function setupHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinksMenu = document.querySelector('.nav-links');
  if (!hamburger || !navLinksMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksMenu.classList.toggle('open');
  });

  navLinksMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksMenu.classList.remove('open');
    });
  });
}

// Run immediately — script loads at bottom of body so DOM is ready
setupHamburger();

// ====================================
// NAVIGATION
// ====================================
function highlightActiveLink() {
  const path = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').toLowerCase();
    if (path.includes('/about/') && href.includes('about')) link.classList.add('active');
    else if (path.includes('/skills/') && href.includes('skills')) link.classList.add('active');
    else if (path.includes('/portfolio/') && href.includes('portfolio')) link.classList.add('active');
    else if (path.includes('/blog/') && href.includes('blog')) link.classList.add('active');
    else if (path.includes('/contact/') && href.includes('contact')) link.classList.add('active');
  });
}

function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (href.startsWith('http')) {
        e.preventDefault();
        window.open(href, '_blank');
      }
    });
  });
}

function setupLogoClick() {
  const logoLink = document.querySelector('.logo-link');
  if (logoLink) {
    logoLink.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        window.location.href = href;
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

function handleAnchorOnLoad() {
  const path = window.location.pathname.toLowerCase();
  const isHome = path.endsWith('index.html') &&
    !path.includes('/about/') && !path.includes('/skills/') &&
    !path.includes('/portfolio/') && !path.includes('/blog/') &&
    !path.includes('/contact/');
  if (isHome && window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

function setupScrollHighlight() {
  const path = window.location.pathname.toLowerCase();
  const isHome = path.endsWith('index.html') &&
    !path.includes('/about/') && !path.includes('/skills/') &&
    !path.includes('/portfolio/') && !path.includes('/blog/') &&
    !path.includes('/contact/');
  if (!isHome) return;

  const sections = document.querySelectorAll('section[id]');
  function highlightSection() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (scrollY > top && scrollY <= top + section.offsetHeight) {
        link?.classList.add('active');
      } else {
        link?.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', highlightSection);
  highlightSection();
}

// ====================================
// SCROLL TO TOP BUTTON
// ====================================
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled + window.innerHeight >= document.body.scrollHeight - 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ====================================
// INITIALIZE
// ====================================
document.addEventListener('DOMContentLoaded', function () {
  // Featured cards on home page only
  const featuredGrid = document.getElementById('featured-grid');
  if (featuredGrid && typeof projects !== 'undefined') {
    const featured = projects.filter(p => p.featured).slice(0, 3);
    featuredGrid.innerHTML = featured.map(p => generateCard(p)).join('');
  }

  highlightActiveLink();
  setupNavigation();
  setupLogoClick();
  handleAnchorOnLoad();
  setupScrollHighlight();
});

window.addEventListener('popstate', function () {
  highlightActiveLink();
  handleAnchorOnLoad();
});