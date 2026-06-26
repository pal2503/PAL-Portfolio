// Pal Akbari Portfolio - Interactive Scripting

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Dark/Light Mode Theme Switcher ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Load theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark-theme';
    body.className = savedTheme;

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('portfolio-theme', 'light-theme');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('portfolio-theme', 'dark-theme');
        }
    });

    // --- Header Scrolled Background Transition ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle Drawer ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('open');
        navLinksContainer.classList.toggle('mobile-active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('open');
            navLinksContainer.classList.remove('mobile-active');
        });
    });

    // --- Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - varOffsetHeader())) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-scroll-to') === currentSection) {
                link.classList.add('active');
            }
        });
    });

    function varOffsetHeader() {
        return 120; // approximate offset padding
    }

    // --- Custom Link Scrolling without Browser Status Bar preview ---
    document.addEventListener('click', (e) => {
        const scrollTarget = e.target.closest('[data-scroll-to]');
        if (scrollTarget) {
            e.preventDefault();
            const targetId = scrollTarget.getAttribute('data-scroll-to');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const absoluteTop = targetSection.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = absoluteTop - varOffsetHeader();
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });

    // --- Typewriter Effect for Hero Subtitle ---
    const typewriterElement = document.getElementById('typewriter-text');
    const words = ["Java Developer", "Full Stack Developer", "Backend Developer", "Software Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 200;

    function handleTypewriter() {
        if (!typewriterElement) return;
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deletion
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // standard typing
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // wait before delete
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // wait before next word
        }

        setTimeout(handleTypewriter, typingSpeed);
    }

    // Launch Typewriter
    setTimeout(handleTypewriter, 1000);

    // --- Skills Tab Switcher ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const skillGrids = document.querySelectorAll('.skills-grid');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = `skills-${btn.dataset.target}`;
            
            // Toggle Button Active State
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle Grid Display Active State
            skillGrids.forEach(grid => {
                grid.classList.remove('active');
                if (grid.getAttribute('id') === targetId) {
                    grid.classList.add('active');
                    // Reset and retrigger progress bar animations
                    const progressBars = grid.querySelectorAll('.progress-bar');
                    progressBars.forEach(bar => {
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = bar.style.getPropertyValue('--val');
                        }, 50);
                    });
                }
            });
        });
    });

    // --- Animate Skill Progress Bars on Scroll Visibility ---
    const skillProgressBars = document.querySelectorAll('.progress-bar');
    const animateBarsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetBar = entry.target;
                targetBar.style.width = targetBar.style.getPropertyValue('--val');
                observer.unobserve(targetBar); // Animate only once
            }
        });
    }, { threshold: 0.1 });

    skillProgressBars.forEach(bar => animateBarsObserver.observe(bar));

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const scrollRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing if animation should happen once
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => scrollRevealObserver.observe(el));

    // --- Modals Orchestration ---
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modalOverlay = document.getElementById('modal-palacademy');
    const modalCloseBtn = modalOverlay.querySelector('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Disable background scrolling
        });
    });

    // Close Modal Callback
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable background scrolling
    };

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Escape Key Modal Close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // --- Contact Form Event Submission ---
    const contactForm = document.getElementById('contact-form');
    const sendIcon = document.getElementById('send-icon');
    const sendSpinner = document.getElementById('send-spinner');
    const formSuccessMessage = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Toggle spinner/button states
            sendIcon.classList.add('hidden');
            sendSpinner.classList.remove('hidden');
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            submitBtn.disabled = true;

            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;

            // Form data mapping
            const formData = { name, email, subject, message, date: new Date().toISOString() };

            // Simulate server network delays (1.2 seconds)
            setTimeout(() => {
                // Save records locally
                const submissions = JSON.parse(localStorage.getItem('portfolio_contacts') || '[]');
                submissions.push(formData);
                localStorage.setItem('portfolio_contacts', JSON.stringify(submissions));

                // Switch UI presentation to success state
                contactForm.classList.add('hidden');
                formSuccessMessage.classList.remove('hidden');
            }, 1200);
        });
    }

    // --- CV / Profile Download Interaction ---
    const cvButton = document.getElementById('download-cv-btn');
    if (cvButton) {
        cvButton.addEventListener('click', () => {
            const resumeUrl = 'assets/Pal_Akbari_Resume.pdf';
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.download = 'Pal_Akbari_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});
