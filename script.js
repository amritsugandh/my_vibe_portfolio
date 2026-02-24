// Mobile Menu Logic
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// 3D Interactive Background Logic
let ticking = false;

document.addEventListener('mousemove', (e) => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

            document.documentElement.style.setProperty('--mouseX', `${xAxis}deg`);
            document.documentElement.style.setProperty('--mouseY', `${yAxis}deg`);
            document.documentElement.style.setProperty('--moveX', `${xAxis * 1.5}px`);
            document.documentElement.style.setProperty('--moveY', `${yAxis * 1.5}px`);

            ticking = false;
        });
        ticking = true;
    }
});

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const themes = ['dark', 'light', 'blue'];
const themeIcons = {
    'dark': 'fa-moon',
    'light': 'fa-sun',
    'blue': 'fa-droplet'
};

// Initialize theme from local storage or default to dark
let currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        let currentIndex = themes.indexOf(currentTheme);
        let nextIndex = (currentIndex + 1) % themes.length;
        currentTheme = themes[nextIndex];

        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon(currentTheme);
    });
}

function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.className = `fa-solid ${themeIcons[theme]}`;
    }
}

// Typing Animation Logic
const typingTextElement = document.querySelector('.typing-text');
const wordsToType = ['Vibe Coder', 'Web Developer', 'Python Developer', 'Frontend Developer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = wordsToType[wordIndex];
    if (isDeleting) {
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % wordsToType.length;
        typeSpeed = 500; // Pause before typing new word
    }

    setTimeout(typeEffect, typeSpeed);
}

if (typingTextElement) {
    typeEffect();
}

// Scroll Animation Logic
const hiddenElements = document.querySelectorAll('.scroll-animate');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Optional: observer.unobserve(entry.target) to animate only once
        }
    });
}, {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: "0px 0px -50px 0px" // Slightly before it reaches bottom
});

hiddenElements.forEach((el) => observer.observe(el));

// Scroll to Top Logic
const scrollTopBtn = document.getElementById('scroll-to-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
