// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
} else if (systemPrefersDark) {
    html.setAttribute('data-theme', 'dark');
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update particles color based on theme
    if (window.pJSDom && window.pJSDom[0]) {
        const particles = window.pJSDom[0].pJS;
        particles.particles.color.value = newTheme === 'dark' ? '#f3f4f6' : '#2563eb';
        particles.particles.line_linked.color = newTheme === 'dark' ? '#f3f4f6' : '#2563eb';
        particles.fn.particlesRefresh();
    }
});

// Initialize Particles.js with theme-aware colors
const particlesConfig = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: html.getAttribute('data-theme') === 'dark' ? '#f3f4f6' : '#2563eb'
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
            color: html.getAttribute('data-theme') === 'dark' ? '#f3f4f6' : '#2563eb',
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
};

// Initialize particles with the config
particlesJS('particles-js', particlesConfig);

// Initialize Typed.js
const typed = new Typed('#typed-text', {
    strings: [
        'Aspiring Software & Web Developer',
        'Full Stack Developer',
        'Problem Solver',
        'Tech Enthusiast'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    startDelay: 1000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--background)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Show success message
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
        } else {
            // Show error message
            showNotification('Oops! There was a problem sending your message. Please try again.', 'error');
        }
    } catch (error) {
        // Show error message
        showNotification('Oops! There was a problem sending your message. Please try again.', 'error');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
});

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles for the notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.color = 'white';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '10px';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideIn 0.5s ease forwards';
    
    if (type === 'success') {
        notification.style.backgroundColor = '#10B981';
    } else {
        notification.style.backgroundColor = '#EF4444';
    }
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Add keyframe animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
}); 