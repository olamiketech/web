// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');
const skipLink = document.querySelector('.skip-link');

// Set theme on page load
function initTheme() {
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeToggleIcon(true);
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateThemeToggleIcon(false);
    }
}

// Toggle theme on button click
function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(!isDark);
    
    // Dispatch custom event for any theme-dependent components
    document.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: newTheme } }));
}

// Update theme toggle icon based on current theme
function updateThemeToggleIcon(isDark) {
    const icon = themeToggle.querySelector('i');
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
        themeToggle.setAttribute('aria-pressed', 'true');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        themeToggle.setAttribute('aria-pressed', 'false');
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just a # link
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
                
                // Focus the target for keyboard users
                setTimeout(() => {
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }, 1000);
            }
        });
    });
}

// Mobile menu functionality
function toggleMobileMenu() {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenuBtn.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
    
    // Toggle aria-hidden on the main content when menu is open
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.setAttribute('aria-hidden', !isExpanded);
    }
}

function closeMobileMenu() {
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.classList.remove('active');
    nav.classList.remove('active');
    document.body.style.overflow = '';
    
    // Ensure main content is not hidden
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.removeAttribute('aria-hidden');
    }
}



// Initialize active link on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialise theme & smooth scrolling
  initTheme();
  initSmoothScrolling();
  // Attach theme and mobile toggle listeners
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  const navLinks = document.querySelectorAll('.nav__link');
  if (navLinks.length > 0) {
    navLinks[0].classList.add('active');
  }

  // Scrollspy to highlight active nav links
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.6 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const navLink = document.querySelector(`.nav__link[href="#${id}"]`);
      if (entry.isIntersecting && navLink) {
        navLinks.forEach(l => l.classList.remove('active'));
        navLink.classList.add('active');
      }
    });
  }, observerOptions);
  sections.forEach(section => observer.observe(section));
});

// GitHub API Integration
async function fetchGitHubData() {
  try {
    // First try to fetch specific featured projects
    const featuredRepos = await Promise.all([
      fetch('https://api.github.com/repos/olamiketech/Leaf-doctor'),
      fetch('https://api.github.com/repos/olamiketech/farming-advice-app'),
      fetch('https://api.github.com/repos/olamiketech/ElectroGadget_AI_Chatbot')
    ]).then(responses => Promise.all(responses.map(r => r.json())));
    
    // Then get 3 most recent other projects
    const recentResponse = await fetch('https://api.github.com/users/olamiketech/repos?sort=updated&per_page=3');
    const recentRepos = await recentResponse.json();
    
    // Combine and filter out duplicates
    const allRepos = [...featuredRepos, ...recentRepos];
    const uniqueRepos = allRepos.filter(
      (repo, index, self) => index === self.findIndex(r => r.id === repo.id)
    );
    
    if (uniqueRepos.length > 0) {
      const githubSection = document.createElement('div');
      githubSection.className = 'github-section';
      githubSection.innerHTML = `
        <h3>More Projects on GitHub</h3>
        <div class="github-repos">
          ${uniqueRepos.map(repo => `
            <div class="github-repo">
              <a href="${repo.html_url}" target="_blank">
                <h4>${repo.name.replace(/-/g, ' ')}</h4>
                <p>${repo.description || 'No description available'}</p>
                <div class="repo-meta">
                  <span>★ ${repo.stargazers_count}</span>
                  <span>${repo.language || 'Code'}</span>
                  <span>Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
              </a>
            </div>
          `).join('')}
        </div>
      `;
      
      document.querySelector('.projects .container').appendChild(githubSection);
    }
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
  }
}


