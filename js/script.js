// ================================
// AUTO GENERATE CARDS FROM DATA
// ================================

function generateCard(project, basePath = '') {
  const imageSrc = project.image
    ? `${basePath}${project.image}`
    : null;

  return `
    <a href="${basePath}projects/${project.id}.html" class="work-card">
      <div class="work-image">
        ${imageSrc
          ? `<img src="${imageSrc}" alt="${project.title}"
                  onerror="this.style.display='none';
                  this.nextElementSibling.style.display='flex'">`
          : ''}
        <div class="work-placeholder"
             style="${imageSrc ? 'display:none' : ''}">
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
// NAVIGATION
// ====================================

// Active link highlight using full pathname
function highlightActiveLink() {
    const path = window.location.pathname.toLowerCase();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').toLowerCase();

        if (path.includes('/about/') && href.includes('about')) {
            link.classList.add('active');
        } else if (path.includes('/skills/') && href.includes('skills')) {
            link.classList.add('active');
        } else if (path.includes('/portfolio/') && href.includes('portfolio')) {
            link.classList.add('active');
        } else if (path.includes('/blog/') && href.includes('blog')) {
            link.classList.add('active');
        } else if (path.includes('/contact/') && href.includes('contact')) {
            link.classList.add('active');
        }
    });
}

// Handle nav link clicks
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else if (href.startsWith('http')) {
                e.preventDefault();
                window.open(href, '_blank');
            }
            // .html links - browser handles naturally
        });
    });
}

// Logo click - navigate to href directly
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

// Handle anchor hash on page load (index.html only)
function handleAnchorOnLoad() {
    const path = window.location.pathname.toLowerCase();
    const isHome = path.endsWith('index.html') &&
                   !path.includes('/about/') &&
                   !path.includes('/skills/') &&
                   !path.includes('/portfolio/') &&
                   !path.includes('/blog/') &&
                   !path.includes('/contact/');

    if (isHome) {
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const targetSection = document.querySelector(hash);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }
}

// Scroll-based section highlight (index.html only)
function setupScrollHighlight() {
    const path = window.location.pathname.toLowerCase();
    const isHome = path.endsWith('index.html') &&
                   !path.includes('/about/') &&
                   !path.includes('/skills/') &&
                   !path.includes('/portfolio/') &&
                   !path.includes('/blog/') &&
                   !path.includes('/contact/');

    if (isHome) {
        const sections = document.querySelectorAll('section[id]');

        function highlightSection() {
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink?.classList.add('active');
                } else {
                    navLink?.classList.remove('active');
                }
            });
        }

        window.addEventListener('scroll', highlightSection);
        highlightSection();
    }
}

// ====================================
// SCROLL TO TOP BUTTON
// ====================================
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const totalHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;

        if (scrolled + windowHeight >= totalHeight - 400) {
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
document.addEventListener('DOMContentLoaded', function() {

    // Load featured cards on index.html ONLY
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
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    highlightActiveLink();
    handleAnchorOnLoad();
});