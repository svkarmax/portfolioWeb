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

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const body = document.body;
  const themeIcon = themeToggle.querySelector('i');

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Apply saved theme on page load
  if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }

  // Toggle theme on button click
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
// NAVIGATION CODE
// ====================================

// Get current page function
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.endsWith('/')) {
        const folderName = path.split('/').filter(p => p).pop() || 'index';
        return folderName + '/';
    }
    return path.split('/').pop() || 'index.html';
}

// Active link highlight
function highlightActiveLink() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.remove('active');

        if (currentPage === 'index.html' || currentPage === '' || currentPage === '/') {
            if (linkHref === './' || linkHref === '/' || linkHref === '../' || linkHref === '') {
                link.classList.add('active');
            }
        }

        if (currentPage.includes('about') && linkHref.includes('about')) {
            link.classList.add('active');
        }
        if (currentPage.includes('skills') && linkHref.includes('skills')) {
            link.classList.add('active');
        }
        if (currentPage.includes('portfolio') && linkHref.includes('portfolio')) {
            link.classList.add('active');
        }
        if (currentPage.includes('blog') && linkHref.includes('blog')) {
            link.classList.add('active');
        }
        if (currentPage.includes('contact') && linkHref.includes('contact')) {
            link.classList.add('active');
        }
    });
}

// Handle link clicks
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
            // .html links - browser handle karega
        });
    });
}

// Logo click handler
function setupLogoClick() {
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();

            const currentPage = getCurrentPage();

            if (currentPage === 'index.html' || currentPage === '') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                window.location.href = 'index.html';
            }
        });
    }
}

// Handle anchor on load
function handleAnchorOnLoad() {
    const currentPage = getCurrentPage();

    if (currentPage === 'index.html' || currentPage === '') {
        const hash = window.location.hash;

        if (hash) {
            setTimeout(() => {
                const targetSection = document.querySelector(hash);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        }
    }
}

// Scroll highlight
function setupScrollHighlight() {
    const currentPage = getCurrentPage();

    if (currentPage === 'index.html' || currentPage === '') {
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

// Scroll to top button
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ====================================
// INITIALIZE EVERYTHING
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');

    // Check if projects exists
    if (typeof projects === 'undefined') {
        console.error('projects.js not loaded!');
        return;
    }

    // Load featured cards on index.html ONLY
    const featuredGrid = document.getElementById('featured-grid');
    if (featuredGrid) {
        console.log('Loading featured projects...');
        const featured = projects.filter(p => p.featured).slice(0, 3);
        featuredGrid.innerHTML = featured.map(p => generateCard(p)).join('');
        console.log('Featured projects loaded:', featured.length);
    }

    // LOAD ALL CARDS ON PORTFOLIO.HTML - COMMENT OUT (portfolio page ka apna script hai)
    /*
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (portfolioGrid) {
        console.log('Loading all projects...');
        portfolioGrid.innerHTML = projects.map(p => generateCard(p, '../')).join('');
        console.log('All projects loaded:', projects.length);
    }
    */

    // Navigation functions
    highlightActiveLink();
    setupNavigation();
    setupLogoClick();
    handleAnchorOnLoad();
    setupScrollHighlight();

    console.log('Initialization complete!');
});

// Back/forward buttons
window.addEventListener('popstate', function() {
    highlightActiveLink();
    handleAnchorOnLoad();
});