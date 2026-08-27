/**
 * Taohedul Islam - Portfolio Interactive Scripts
 * Handles mobile navigation, scroll-reveal animations, active section link highlighting, and contact form feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Mobile Menu Toggle
    // -------------------------------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            hamburger.classList.toggle('active');
            
            // Toggle hamburger icon animation
            const isExpanded = navMenu.classList.contains('open');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // -------------------------------------------------------------------------
    // 2. Navbar Background on Scroll
    // -------------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // -------------------------------------------------------------------------
    // 3. Active Link Highlighting on Scroll
    // -------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    
    const highlightActiveNav = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

            if (correspondingNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingNavLink.classList.add('active');
                } else {
                    correspondingNavLink.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightActiveNav);

    // -------------------------------------------------------------------------
    // 4. Scroll Reveal Animations (Intersection Observer)
    // -------------------------------------------------------------------------
    const revealElements = document.querySelectorAll('[data-reveal]');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Reveal once
                }
            });
        }, {
            root: null,
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for browsers without IntersectionObserver support
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // -------------------------------------------------------------------------
    // 5. Interactive Contact Form Handler
    // -------------------------------------------------------------------------
    const contactForm = document.getElementById('portfolio-contact-form');
    const toast = document.getElementById('form-toast');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && toast) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Button feedback
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            setTimeout(() => {
                // Show success toast
                toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${escapeHtml(name)}</strong>! Your message regarding "<em>${escapeHtml(subject)}</em>" has been recorded.`;
                toast.classList.remove('hidden');

                // Reset form
                contactForm.reset();
                submitBtn.innerHTML = originalBtnHtml;
                submitBtn.disabled = false;

                // Auto-hide toast after 7 seconds
                setTimeout(() => {
                    toast.classList.add('hidden');
                }, 7000);
            }, 600);
        });
    }

    // Helper function to prevent XSS in demo toast
    function escapeHtml(string) {
        return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // -------------------------------------------------------------------------
    // 6. Dynamic Year in Footer
    // -------------------------------------------------------------------------
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});
