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



// Chatbot Widget Functionality
function initChatbot() {
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotModal = document.getElementById('chatbotModal');
  const chatbotContent = document.querySelector('.chatbot-content');
  let lastFocusedElement = null;

  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([type="hidden"]):not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  const getFocusableElements = () => {
    if (!chatbotModal) return [];
    return Array.from(chatbotModal.querySelectorAll(focusableSelectors)).filter(el => {
      return !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== '-1' && el.offsetParent !== null;
    });
  };

  const trapFocus = (event) => {
    if (event.key !== 'Tab' || !chatbotModal.classList.contains('active')) return;
    const focusableEls = getFocusableElements();
    if (focusableEls.length === 0) {
      event.preventDefault();
      chatbotClose.focus();
      return;
    }

    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    if (event.shiftKey && document.activeElement === firstEl) {
      event.preventDefault();
      lastEl.focus();
    } else if (!event.shiftKey && document.activeElement === lastEl) {
      event.preventDefault();
      firstEl.focus();
    }
  };

  const openChatbot = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    lastFocusedElement = document.activeElement;
    chatbotModal.classList.add('active');
    chatbotModal.setAttribute('aria-hidden', 'false');
    chatbotToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    const focusableEls = getFocusableElements();
    const targetFocus = focusableEls.find(el => el !== chatbotToggle) || chatbotClose;
    if (targetFocus) {
      setTimeout(() => targetFocus.focus(), 0);
    }
  };

  const closeChatbot = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    chatbotModal.classList.remove('active');
    chatbotModal.setAttribute('aria-hidden', 'true');
    chatbotToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      setTimeout(() => lastFocusedElement.focus(), 0);
    } else {
      chatbotToggle.focus();
    }
  };

  if (chatbotToggle && chatbotModal && chatbotClose) {
    chatbotModal.setAttribute('aria-hidden', chatbotModal.classList.contains('active') ? 'false' : 'true');
    chatbotToggle.setAttribute('aria-expanded', 'false');

    // Open modal when clicking toggle button
    chatbotToggle.addEventListener('click', openChatbot);

    // Close modal when clicking close button
    chatbotClose.addEventListener('click', closeChatbot);

    // Close when clicking outside the modal (on the backdrop)
    chatbotModal.addEventListener('click', (e) => {
      // Only close if clicking directly on the modal backdrop, not on the content
      if (e.target === chatbotModal) {
        closeChatbot(e);
      }
    });

    // Prevent modal from closing when clicking inside the content area
    if (chatbotContent) {
      chatbotContent.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && chatbotModal.classList.contains('active')) {
        closeChatbot(e);
      }
    });

    // Trap focus within modal when active
    document.addEventListener('keydown', trapFocus);

    window.chatbotController = {
      open: openChatbot,
      close: closeChatbot
    };
    chatbotToggle.dataset.listenerAttached = 'true';
  } else {
    console.error('Chatbot elements not found:', {
      toggle: !!chatbotToggle,
      modal: !!chatbotModal,
      close: !!chatbotClose
    });
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
  
  // Initialize chatbot - with a small delay to ensure DOM is fully ready
  setTimeout(() => {
    initChatbot();
  }, 100);
});

// Fallback: Initialize chatbot if DOM is already loaded
if (document.readyState !== 'loading') {
  setTimeout(initChatbot, 200);
}

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


