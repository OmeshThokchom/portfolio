// Particle.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#06b6d4'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#06b6d4',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typewriter effect
const typewriter = document.getElementById('typewriter');
const messages = [
    'Building Intelligent Systems',
    'Developing ML Solutions',
    'Creating AI Applications',
    'Data Science Enthusiast'
];

let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function type() {
    const currentMessage = messages[messageIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentMessage.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriter.textContent = currentMessage.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentMessage.length) {
        isWaiting = true;
        setTimeout(() => {
            isDeleting = true;
            isWaiting = false;
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        messageIndex = (messageIndex + 1) % messages.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    if (!isWaiting) {
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(type, 2000);
    }
}

// Start typewriter effect
type();

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Skill bars animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.dataset.width;
        bar.style.width = width;
    });
}

const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

skillsObserver.observe(skillsSection);

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Cursor follower
const cursor = document.querySelector('.cursor-follow');
let cursorVisible = false;
let cursorEnlarged = false;

document.addEventListener('mousemove', (e) => {
    if (!cursorVisible) {
        cursor.style.opacity = 1;
        cursorVisible = true;
    }
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = 1;
    cursorVisible = true;
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = 0;
    cursorVisible = false;
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('hover');
    cursorEnlarged = true;
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('hover');
    cursorEnlarged = false;
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});
