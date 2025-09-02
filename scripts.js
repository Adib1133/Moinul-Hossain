// Initialize EmailJS
(function () {
    emailjs.init("dB91tFISaTV4O-kfj");
})();

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const userName = document.getElementById('userName').value.trim();
            const userEmail = document.getElementById('userEmail').value.trim();
            const userMessage = document.getElementById('userMessage').value.trim();

            // Show loading message
            showStatusMessage('Sending message...', 'loading');

            // Prepare email parameters (must match template variables!)
            const templateParams = {
                from_name: userName,
                from_email: userEmail,
                message: userMessage,
                subject: `Portfolio Contact: ${userName}`
            };

            // Send email using EmailJS
            emailjs.send('service_mma31jy', 'template_a3a1uzt', templateParams)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showStatusMessage('Message sent successfully! Thank you for reaching out.', 'success');
                    contactForm.reset();
                })
                .catch(function (error) {
                    console.error('FAILED...', error);
                    showStatusMessage('Failed to send message. Please try again or contact directly via email.', 'error');
                });
        });
    }

    function showStatusMessage(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = `status-message show ${type}`;

        if (type !== 'loading') {
            setTimeout(() => {
                statusMessage.classList.remove('show');
            }, 5000);
        }
    }
});

// Mobile Menu Functionality
function toggleMobileMenu() {
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    const menuToggle = document.querySelector('.menu-toggle');

    mobileNavMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    const menuToggle = document.querySelector('.menu-toggle');

    mobileNavMenu.classList.remove('active');
    menuToggle.classList.remove('active');
}

const projects = {
    project1: {
        title: "Klinik-24",
        description: "<ul><li>Developed a web application for a healthcare platform using a modern front-end setup</li><li>Structured for fast local DX (Vite) and maintainability (TS, module aliases).</li></ul>",
        githubLink: "https://github.com/Adib1133/Klinik-24"
    },
    project2: {
        title: "Healthcare Landing Page",
        description: "<ul><li> Designed and developed a responsive landing page for a healthcare platform, recreated from a Figma design file.</li><li>Ensured accessibility and mobile performance.</li></ul>",
        githubLink: "https://github.com/Adib1133/klinik24-landing"
    },
    project3: {
        title: "E-Commerce Medicine Store — PHP (Laravel), MySQL",
        description: "<ul><li>Developed a medicine store web app with authentication and database integration</li><li>Designed relational schema and optimized common read queries (indexes, eager loading).</li></ul>",
        githubLink: "https://github.com/Adib1133/Websites"
    },
    project4: {
        title: "Hate Speech Detection — Python (ML/NLP)",
        description: "<ul><li>Built a hate speech classifier for social media platforms</li><li>Skills: Python, Machine Learning, NLP</li></ul>",
        githubLink: "https://github.com/Adib1133/Hate-Speech-Detection"
    },
    project5: {
        title: "Stock Market Trend Simulation — Python (Monte Carlo)",
        description: "<ul><li>Implemented Monte Carlo Simulation for stock market trend prediction Focused on algorithm efficiency and forecasting</li><li>Quantitative outcome: Achieved MAPE of 5.2% compared to baseline model.</li></ul>",
        githubLink: "https://github.com/Adib1133/Predicting-Stock-Market-Trends-through-Monte-Carlo-Simulation"
    },
    project6: {
        title: "Single Image Super-Resolution",
        description: "<ul><li>Implemented an MSRGAN pipeline optimized for consumer GPUs; used DIV2K dataset with a custom training regime.</li><li>Implemented MSRGAN-based GAN model for image super-resolution</li></ul>",
        githubLink: "https://github.com/Adib1133/Thesis"
    },
    project7: {
        title: "Interface Design",
        description: "<ul><li>Designed and developed a user interface project focused on creating intuitive and visually appealing designs</li></ul>",
        githubLink: "https://github.com/Adib1133/Interface-Design"
    },
    project8: {
        title: "Road Safety Animation",
        description: "<ul><li>Coded 2D animation using Midpoint algorithms for line/circle rasterization; implemented scene graph and input handling.</li><li>Optimized render loop for smooth performance on low-end hardware.</li></ul>",
        githubLink: "https://github.com/Adib1133/2d-Animation"
    }
};

// Optimized modal functions
function openModal(projectId) {
    const project = projects[projectId];
    const modalBody = document.getElementById('modalBody');
    const modalOverlay = document.getElementById('modalOverlay');

    // Use requestAnimationFrame for smoother animations
    requestAnimationFrame(() => {
        modalBody.innerHTML = `
            <h3>${project.title}</h3>
            ${project.description}
            <a href="${project.githubLink}" target="_blank" class="github-link-btn">
                <i class="fab fa-github"></i>
                View on GitHub
            </a>
        `;

        modalOverlay.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Disable particles animation temporarily for better performance
        const particlesCanvas = document.querySelector('#particles-js canvas');
        if (particlesCanvas) {
            particlesCanvas.style.animationPlayState = 'paused';
        }
    });
}

function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    
    requestAnimationFrame(() => {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
        
        // Re-enable particles animation
        const particlesCanvas = document.querySelector('#particles-js canvas');
        if (particlesCanvas) {
            particlesCanvas.style.animationPlayState = 'running';
        }
    });
}

// Close modal when clicking outside
document.getElementById('modalOverlay').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Optimized ScrollReveal animations with reduced complexity
ScrollReveal().reveal('.home-content, .about-content, .skills-grid, .education-grid, .experience-grid, .projects-grid, .contact-content', {
    delay: 50,
    distance: '30px',
    origin: 'bottom',
    duration: 400,
    easing: 'ease-out',
    reset: false, // Changed to false to prevent repeated animations
    viewFactor: 0.2
});

// Initialize particles with performance optimization
particlesJS.load('particles-js', 'particles.json', function () {
    console.log('particles.json loaded...');
    
    // Optimize particles performance
    const particlesCanvas = document.querySelector('#particles-js canvas');
    if (particlesCanvas) {
        // Use will-change for better GPU acceleration
        particlesCanvas.style.willChange = 'transform';
    }
});

// Throttled scroll to top functionality
let scrollTimeout;
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener('scroll', function() {
    // Throttle scroll events for better performance
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }, 10);
}, { passive: true });

scrollToTopBtn.addEventListener("click", function () {
    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile menu functionality with performance optimization
function toggleMobileMenu() {
    const menu = document.getElementById('mobileNavMenu');
    const menuToggle = document.querySelector('.menu-toggle');

    requestAnimationFrame(() => {
        menu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileNavMenu');
    const menuToggle = document.querySelector('.menu-toggle');

    requestAnimationFrame(() => {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
}

// Optimized click outside handler
let clickTimeout;
document.addEventListener('click', function (event) {
    if (clickTimeout) {
        clearTimeout(clickTimeout);
    }
    
    clickTimeout = setTimeout(() => {
        const menu = document.getElementById('mobileNavMenu');
        const menuToggle = document.querySelector('.menu-toggle');

        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }, 10);
});

// Optimized smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            requestAnimationFrame(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
    });
});

// Performance optimization: Enable smooth scrolling after page load
window.addEventListener('load', function() {
    document.documentElement.classList.add('loaded');
});