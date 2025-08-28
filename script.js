const projects = {
    project1: {
        title: "GAN-based Super-Resolution",
        description: "Developed a GAN-based model for single-image super-resolution, utilizing a custom Generative Adversarial Network (GAN) tailored to meet specific requirements. The custom model, named MSRGAN, was implemented using Python and TensorFlow. This project focuses on enhancing image quality and resolution through advanced machine learning techniques, demonstrating proficiency in deep learning architectures and computer vision applications.",
        githubLink: "https://github.com/Adib1133/Thesis"
    },
    project2: {
        title: "Hate Speech Detection",
        description: "Developed and deployed a Python-based algorithm designed to detect hate speech on social media platforms, specifically Twitter. The model leverages Logistic Regression and Naïve Bayes techniques and is entirely implemented using Python programming. This project addresses the critical need for automated content moderation in social media platforms, utilizing natural language processing and machine learning classification algorithms to identify potentially harmful content.",
        githubLink: "https://github.com/Adib1133/Hate-Speech-Detection"
    },
    project3: {
        title: "E-Commerce Medicine Store",
        description: "Developed an e-commerce medicine store as an academic project. The website is built using the Laravel framework and it's based on PHP, MySQL, HTML, and CSS. This comprehensive web application includes features such as product catalog management, user authentication, shopping cart functionality, order processing, and payment integration. The project demonstrates full-stack web development skills and understanding of e-commerce business logic.",
        githubLink: "https://github.com/Adib1133/Websites"
    },
    project4: {
        title: "Stock Market Prediction",
        description: "Utilized Monte Carlo Simulation to predict stock market trends, specifically focusing on Samsung Electronics Inc. The simulation was developed using Python programming, with datasets sourced from Yahoo Finance. This project explores financial modeling and statistical analysis techniques to forecast stock price movements, implementing probabilistic methods to assess market volatility and potential investment outcomes.",
        githubLink: "https://github.com/Adib1133/Predicting-Stock-Market-Trends-through-Monte-Carlo-Simulation"
    },
    project5: {
        title: "Event Management System",
        description: "Developed a dynamic Event Management System using Vue.js, HTML, CSS, and JavaScript with a responsive Bootstrap design. The platform features interactive event filtering, real-time password validation, and a registration form with dynamic dropdowns. This project showcases modern frontend development skills, user interface design principles, and interactive web application development using popular JavaScript frameworks.",
        githubLink: "https://github.com/Adib1133/Interface-Design"
    }
};

function openModal(projectId) {
    const project = projects[projectId];
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.githubLink}" target="_blank" class="github-link-btn">
            <i class="fab fa-github"></i>
            View on GitHub
        </a>
    `;

    document.getElementById('modalOverlay').classList.add('active');
    document.body.classList.add('modal-open');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.classList.remove('modal-open');
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

// ScrollReveal animations
ScrollReveal().reveal('.home-content, .about-content, .skills-grid, .education-grid, .experience-grid, .projects-grid, .contact-content', {
    delay: 100,
    distance: '50px',
    origin: 'bottom',
    duration: 500,
    easing: 'ease-in-out',
    reset: true
});

// Initialize particles
particlesJS.load('particles-js', 'particles.json', function () {
    console.log('Particles.js loaded!');
});

// Scroll to top functionality
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

scrollToTopBtn.addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// Mobile menu functionality
function toggleMobileMenu() {
    const menu = document.getElementById('mobileNavMenu');
    const menuToggle = document.querySelector('.menu-toggle');

    menu.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileNavMenu');
    const menuToggle = document.querySelector('.menu-toggle');

    menu.classList.remove('active');
    menuToggle.classList.remove('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const menu = document.getElementById('mobileNavMenu');
    const menuToggle = document.querySelector('.menu-toggle');

    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
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