

document.addEventListener('DOMContentLoaded', () => {
    
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 100);
            });
        });
    }

    
    const scrollProgress = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        }
    });

    
    const fadeElements = document.querySelectorAll('.fade-in-element');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    
    const counters = document.querySelectorAll('.counter');
    let counterAnimated = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                counterAnimated = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const increment = target / 100;
                    
                    const updateCounter = () => {
                        const current = +counter.textContent;
                        
                        if (current < target) {
                            counter.textContent = Math.ceil(current + increment);
                            setTimeout(updateCounter, 20);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                });
            }
        });
    }, {
        threshold: 0.5
    });
    
    if (counters.length > 0) {
        counterObserver.observe(counters[0].closest('.stat-card'));
    }

    
    const skillBars = document.querySelectorAll('.skill-bar');
    let skillsAnimated = false;
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        });
    }, {
        threshold: 0.3
    });
    
    if (skillBars.length > 0) {
        skillObserver.observe(skillBars[0].closest('section'));
    }

    
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

    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span class="mr-2">⏳</span>Sending...';
            submitButton.disabled = true;
            
            
            setTimeout(() => {
                submitButton.innerHTML = '<span class="mr-2">✅</span>Sent!';
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }, 1000);
        });
    }
});
