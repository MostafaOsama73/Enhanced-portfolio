document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Copyright Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Typing Effect for Hero Section
    const strings = ["Backend .NET Developer", "Software Engineer", "Full-Stack Trainee"];
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
    } // End type function

    // Start typing effect if element exists
    if (typingElement) {
        type();
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
                navLinks.style.padding = '20px';
                navLinks.style.zIndex = '999';
            }
        });
    }

    // Scroll Animations (IntersectionObserver)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                entry.target.classList.remove('hidden');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});
