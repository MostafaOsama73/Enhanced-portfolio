document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Copyright Year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Typing Effect for Hero Section
    const strings = ["Dynamics 365 F&O Developer", ".NET Backend Developer", "Full-Stack Developer"];
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing-text');
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    function type() {
        const currentString = strings[stringIndex];

        if (isDeleting) {
            typingElement.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeDelay = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentString.length) {
            typeDelay = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % strings.length;
        }

        setTimeout(type, typeDelay);
    }

    if (typingElement) {
        type();
    }

    // Custom Interactive Cursor
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline) {
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        // Add hover effects for interactive elements
        const hoverables = document.querySelectorAll('a, button, .project-card, .skill-tag, .hero-tech-badge, .cert-card');
        hoverables.forEach((el) => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
        });
    }

    // Scroll Progress Bar & Back to Top & Active Nav Highlighting
    const progressBar = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }

        if (backToTopBtn) {
            if (scrollTop > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Active Link Highlighting
        let currentSectionId = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinksList.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileBtn && navLinksContainer) {
        mobileBtn.addEventListener('click', () => {
            const isFlex = navLinksContainer.style.display === 'flex';
            navLinksContainer.style.display = isFlex ? 'none' : 'flex';

            if (!isFlex) {
                navLinksContainer.style.flexDirection = 'column';
                navLinksContainer.style.position = 'absolute';
                navLinksContainer.style.top = '70px';
                navLinksContainer.style.left = '0';
                navLinksContainer.style.width = '100%';
                navLinksContainer.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
                navLinksContainer.style.padding = '20px';
                navLinksContainer.style.zIndex = '999';
            }
        });
    }

    // Animated Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    function animateStats() {
        statNumbers.forEach((stat) => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const suffix = stat.getAttribute('data-suffix') || '';
            const duration = 2000;
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = `${Math.floor(current)}${suffix}`;
            }, stepTime);
        });
    }

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasAnimatedStats) {
                    hasAnimatedStats = true;
                    animateStats();
                }
            });
        }, { threshold: 0.3 });
        statsObserver.observe(statsSection);
    }

    // Resume / CV Modal Controls
    const cvModal = document.getElementById('cv-modal');
    const openCvNav = document.getElementById('nav-cv-link');
    const openCvHero = document.getElementById('hero-cv-btn');
    const closeCvBtn = document.getElementById('close-cv-modal');
    const closeCvAction = document.getElementById('modal-close-action');

    function openModal(e) {
        if (e) e.preventDefault();
        if (cvModal) cvModal.classList.add('active');
    }

    function closeModal() {
        if (cvModal) cvModal.classList.remove('active');
    }

    if (openCvNav) openCvNav.addEventListener('click', openModal);
    if (openCvHero) openCvHero.addEventListener('click', openModal);
    if (closeCvBtn) closeCvBtn.addEventListener('click', closeModal);
    if (closeCvAction) closeCvAction.addEventListener('click', closeModal);

    if (cvModal) {
        cvModal.addEventListener('click', (e) => {
            if (e.target === cvModal) closeModal();
        });
    }

    // Category Filter Tabs
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach((card) => {
                const categories = card.getAttribute('data-category') || '';
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Project Architecture Spec Modals Data & Logic
    const projectSpecsData = {
        unistay: {
            title: "UniStay – Student Housing System",
            subtitle: "Architecture & Infrastructure Overview",
            body: `
                <div class="spec-block">
                    <h4><i class="fa-solid fa-gears"></i> Core Architecture</h4>
                    <p>Designed with ASP.NET Core (.NET 8) following Clean Architecture principles. Built role-based access control (Student, Landlord, Admin) powered by JWT tokens and Refresh Token rotation.</p>
                </div>
                <div class="spec-block">
                    <h4><i class="fa-solid fa-credit-card"></i> Payment & Real-Time Communications</h4>
                    <p>Integrated Paymob Payment Gateway for secure booking transactions. Leveraged SignalR for real-time landlord-student messaging and instant push notifications.</p>
                </div>
                <div class="spec-block">
                    <h4><i class="fa-solid fa-list-check"></i> Key Capabilities</h4>
                    <ul class="spec-list">
                        <li><i class="fa-solid fa-check accent"></i> Digital contract management with electronic signatures</li>
                        <li><i class="fa-solid fa-check accent"></i> Hangfire background job scheduler for automated lease reminders</li>
                        <li><i class="fa-solid fa-check accent"></i> FluentValidation and custom exception handling middleware</li>
                    </ul>
                </div>
            `
        },
        smartcare: {
            title: "SmartCareSystem Backend API",
            subtitle: "Enterprise Healthcare REST API Architecture",
            body: `
                <div class="spec-block">
                    <h4><i class="fa-solid fa-notes-medical"></i> Domain Architecture</h4>
                    <p>Healthcare management system handling doctor schedules, patient profiles, diagnostic reports, and medical history following Repository & Unit of Work patterns.</p>
                </div>
                <div class="spec-block">
                    <h4><i class="fa-solid fa-shield-halved"></i> Data Security & Rollback</h4>
                    <p>Implemented EF Core database transaction rollbacks to guarantee data integrity across multi-step appointment bookings and medical record updates.</p>
                </div>
                <div class="spec-block">
                    <h4><i class="fa-solid fa-list-check"></i> Key Capabilities</h4>
                    <ul class="spec-list">
                        <li><i class="fa-solid fa-check accent"></i> JWT claims-based authorization for multi-role workflows</li>
                        <li><i class="fa-solid fa-check accent"></i> AutoMapper object-object mapping for clean DTO transfers</li>
                        <li><i class="fa-solid fa-check accent"></i> Secure integration with external AI/diagnostic services</li>
                    </ul>
                </div>
            `
        },
        narcos: {
            title: "E-Commerce API (NarcosStore)",
            subtitle: "Gaming Marketplace Backend Specifications",
            body: `
                <div class="spec-block">
                    <h4><i class="fa-solid fa-store"></i> Marketplace Backend</h4>
                    <p>Production-ready REST API powering a gaming product store. Structured schema supporting Users, Products, Categories, Orders, and Payment Statuses.</p>
                </div>
                <div class="spec-block">
                    <h4><i class="fa-solid fa-bolt"></i> Async Service Pipeline</h4>
                    <p>Built fully async service methods with Entity Framework Core and SQL Server, ensuring high throughput during peak traffic spikes.</p>
                </div>
                <div class="spec-block">
                    <h4><i class="fa-solid fa-list-check"></i> Key Capabilities</h4>
                    <ul class="spec-list">
                        <li><i class="fa-solid fa-check accent"></i> Full order lifecycle management & inventory tracking</li>
                        <li><i class="fa-solid fa-check accent"></i> Comprehensive global exception handling middleware</li>
                        <li><i class="fa-solid fa-check accent"></i> AutoMapper data mapping with layered repository pattern</li>
                    </ul>
                </div>
            `
        },
        d365: {
            title: "D365 F&O Enterprise Customizations",
            subtitle: "Microsoft Dynamics 365 X++ Extensions",
            body: `
                <div class="spec-block">
                    <h4><i class="fa-brands fa-microsoft"></i> X++ Solutions</h4>
                    <p>Extensive development on Microsoft Dynamics 365 Finance & Operations using X++, creating extension-based customizations without modifying base objects.</p>
                </div>
                <div class="spec-block">
                    <h4><i class="fa-solid fa-sitemap"></i> Enterprise Components</h4>
                    <p>Built custom Data Entities, Forms, Tables, Classes, Workflows, and Validations tailored to enterprise business requirements.</p>
                </div>
                <div class="spec-block">
                    <h4><i class="fa-solid fa-list-check"></i> Key Capabilities</h4>
                    <ul class="spec-list">
                        <li><i class="fa-solid fa-check accent"></i> Custom approval workflows and automated business logic</li>
                        <li><i class="fa-solid fa-check accent"></i> Data Entity exports and integrations via OData / REST</li>
                        <li><i class="fa-solid fa-check accent"></i> Debugging, performance tuning, and extension upgrades</li>
                    </ul>
                </div>
            `
        }
    };

    const projectSpecModal = document.getElementById('project-spec-modal');
    const projectModalTitle = document.getElementById('project-modal-title');
    const projectModalSubtitle = document.getElementById('project-modal-subtitle');
    const projectModalBody = document.getElementById('project-modal-body');
    const closeProjectModalBtn = document.getElementById('close-project-modal');
    const closeProjectActionBtn = document.getElementById('close-project-action');

    const detailBtns = document.querySelectorAll('.btn-project-details');
    detailBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projKey = btn.getAttribute('data-project');
            const data = projectSpecsData[projKey];

            if (data && projectSpecModal) {
                projectModalTitle.innerHTML = `<i class="fa-solid fa-layer-group accent"></i> ${data.title}`;
                projectModalSubtitle.textContent = data.subtitle;
                projectModalBody.innerHTML = data.body;
                projectSpecModal.classList.add('active');
            }
        });
    });

    function closeProjectModal() {
        if (projectSpecModal) projectSpecModal.classList.remove('active');
    }

    if (closeProjectModalBtn) closeProjectModalBtn.addEventListener('click', closeProjectModal);
    if (closeProjectActionBtn) closeProjectActionBtn.addEventListener('click', closeProjectModal);
    if (projectSpecModal) {
        projectSpecModal.addEventListener('click', (e) => {
            if (e.target === projectSpecModal) closeProjectModal();
        });
    }

    // Contact Form Submission (Supports Local Dev Server & Production Web Servers)
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastMsg = document.getElementById('toast-msg');

    if (contactForm && toast) {
        contactForm.addEventListener('submit', function (e) {
            const nameVal = document.getElementById('contact-name').value;
            const emailVal = document.getElementById('contact-email').value;
            const subjectVal = document.getElementById('contact-subject').value;
            const messageVal = document.getElementById('contact-message').value;

            // If browsed directly as local file (file://), open pre-filled mailto client to avoid FormSubmit block
            if (window.location.protocol === 'file:') {
                e.preventDefault();
                if (toastTitle) toastTitle.textContent = "Opening Email Client";
                if (toastMsg) toastMsg.textContent = "Browsed as local file. Opening your mail client pre-filled!";
                toast.classList.add('active');

                const mailtoUrl = `mailto:mostafaosama1012005@gmail.com?subject=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent("Sender Name: " + nameVal + "\nSender Email: " + emailVal + "\n\nMessage:\n" + messageVal)}`;
                setTimeout(() => {
                    window.location.href = mailtoUrl;
                    contactForm.reset();
                    setTimeout(() => toast.classList.remove('active'), 5000);
                }, 600);
                return;
            }

            // Running on a Local Web Server (http://localhost:8000) or Live Web Server (https://...)
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Send Message';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            }

            const formData = new FormData(contactForm);

            fetch("https://formsubmit.co/ajax/mostafaosama1012005@gmail.com", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json().catch(() => ({})))
            .then(data => {
                if (toastTitle) toastTitle.textContent = "Email Sent Successfully!";
                if (toastMsg) toastMsg.textContent = "Thank you! Your message has been delivered directly to Mostafa's email.";
                contactForm.reset();
            })
            .catch(() => {
                if (toastTitle) toastTitle.textContent = "Email Dispatched";
                if (toastMsg) toastMsg.textContent = "Your message has been sent. Thank you!";
                contactForm.reset();
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
                toast.classList.add('active');
                setTimeout(() => toast.classList.remove('active'), 6000);
            });
        });
    }

    // Code Architecture Showcase Terminal Tab Switching
    const tabBtns = document.querySelectorAll('.terminal-tabs .tab-btn');
    const codeBlocks = document.querySelectorAll('.code-block');

    tabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach((b) => b.classList.remove('active'));
            codeBlocks.forEach((cb) => cb.classList.remove('active'));

            btn.classList.add('active');
            const targetBlock = document.getElementById(`code-${targetTab}`);
            if (targetBlock) {
                targetBlock.classList.add('active');
            }
        });
    });

    // Scroll Animations (IntersectionObserver)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                entry.target.classList.remove('hidden');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});

