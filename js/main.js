// Main navigation functions
const showSection = (section, isAnimate) => {
  const direction = section.replace(/#/, '');
  const reqSection = $(`.section[data-section="${direction}"]`);
  const reqSectionPos = reqSection.offset().top - 0;

  if (isAnimate) {
    $('body, html').animate({
      scrollTop: reqSectionPos
    }, 800);
  } else {
    $('body, html').scrollTop(reqSectionPos);
  }
};

const checkSection = () => {
  const wScroll = $(window).scrollTop();
  
  $('.section').each(function() {
    const $this = $(this);
    const topEdge = $this.offset().top - 80;
    const bottomEdge = topEdge + $this.height();
    
    if (topEdge < wScroll && bottomEdge > wScroll) {
      const currentId = $this.data('section');
      const reqLink = $(`a[href*="#${currentId}"]`);
      
      reqLink.closest('li')
        .addClass('active')
        .siblings()
        .removeClass('active');
    }
  });
};

// Event listeners
$(window).on('scroll', checkSection);
$(window).on('load', checkSection);

$('.main-menu').on('click', 'a', function(e) {
  e.preventDefault();
  showSection($(this).attr('href'), true);
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme or use preferred color scheme
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

// Toggle theme
function toggleTheme() {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

themeToggle.addEventListener('click', toggleTheme);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Account for header height
        behavior: 'smooth'
      });
    }
  });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Initialize active link on page load
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav__link');
  if (navLinks.length > 0) {
    navLinks[0].classList.add('active');
  }
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

// Call when DOM is loaded
document.addEventListener('DOMContentLoaded', fetchGitHubData);
