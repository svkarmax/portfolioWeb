const projects = [
  {
    id: 'qr-generator',
    title: 'QR Code Generator',
    category: 'Web Development',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: 'Generate QR codes instantly from any URL or text with one-click PNG download.',
    image: null,
    placeholder: '🔳',
    link: 'https://github.com/svkarmax/qr-generator',
    github: 'https://github.com/svkarmax/qr-generator',
    featured: true
  },
  {
    id: 'medicine-reminder',
    title: 'Medicine Reminder App',
    category: 'Android',
    tags: ['Java', 'Android', 'SQLite'],
    description: 'Never miss a dose with scheduled reminders and tracking.',
    image: null,
    placeholder: '💊',
    link: '#',
    github: '#',
    featured: true
  },
  {
    id: 'school-management',
    title: 'School Management System',
    category: 'Java',
    tags: ['Java', 'MySQL', 'JSP'],
    description: 'Complete school ERP with attendance, exams and fee management.',
    image: null,
    placeholder: '🏫',
    link: '#',
    github: '#',
    featured: true
  },
  {
    id: 'windchill-customization',
    title: 'Windchill PLM Customization',
    category: 'Windchill',
    tags: ['Java', 'Windchill', 'PLM'],
    description: 'Custom workflows and UI modifications for Windchill PLM system.',
    image: null,
    placeholder: '⚙️',
    link: '#',
    github: '#',
    featured: false
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    category: 'Web Development',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: 'Personal portfolio website with dark theme and responsive design.',
    image: null,
    placeholder: '🌐',
    link: 'https://github.com/svkarmax/portfolio',
    github: 'https://github.com/svkarmax/portfolio',
    featured: false
  },
  {
    id: 'weather-app',
    title: 'Weather App',
    category: 'Web Development',
    tags: ['JavaScript', 'API', 'CSS'],
    description: 'Real-time weather application using OpenWeatherMap API.',
    image: null,
    placeholder: '🌤️',
    link: '#',
    github: '#',
    featured: false
  },
  {
    id: 'task-manager',
    title: 'Task Manager',
    category: 'Android',
    tags: ['Java', 'Android', 'Room DB'],
    description: 'Task management app with reminders and categories.',
    image: null,
    placeholder: '✅',
    link: '#',
    github: '#',
    featured: false
  },
  {
    id: 'ecommerce-api',
    title: 'E-Commerce API',
    category: 'Java',
    tags: ['Spring Boot', 'JPA', 'MySQL'],
    description: 'RESTful API for e-commerce platform with JWT authentication.',
    image: null,
    placeholder: '🛒',
    link: '#',
    github: '#',
    featured: false
  }
];

// Make sure projects is available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = projects;
}