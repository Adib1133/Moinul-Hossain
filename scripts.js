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

        function openModal(projectId) {
            const project = projects[projectId];
            const modalBody = document.getElementById('modalBody');

            modalBody.innerHTML = `
                <h3>${project.title}</h3>
                ${project.description}
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
        particlesJS.load('particles-js', 'particles.json', function() {
    console.log('particles.json loaded...');
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
				// Smooth scroll to top
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
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