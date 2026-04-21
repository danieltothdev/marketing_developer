/* ============================================
   DR. CSIZMADIA BEÁTA — Premium Website JS
   ============================================ */

(function () {
    'use strict';

    /* --- Navbar scroll behavior --- */
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    let lastScroll = 0;

    function handleScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (currentScroll > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    /* --- Back to top --- */
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* --- Mobile nav toggle --- */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function () {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            navMenu.classList.remove('open');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    /* --- Scroll animation (IntersectionObserver) --- */
    var animElements = document.querySelectorAll('[data-animate]');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var delay = entry.target.getAttribute('data-delay') || 0;
                        setTimeout(function () {
                            entry.target.classList.add('animated');
                        }, parseInt(delay, 10));
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        animElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        animElements.forEach(function (el) {
            el.classList.add('animated');
        });
    }

    /* --- Testimonial Slider --- */
    var track = document.getElementById('testimonialTrack');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var dotsContainer = document.getElementById('testimonialDots');

    if (track && prevBtn && nextBtn && dotsContainer) {
        var cards = track.querySelectorAll('.testimonial-card');
        var currentIndex = 0;
        var cardsPerView = getCardsPerView();
        var maxIndex = Math.max(0, cards.length - cardsPerView);

        function getCardsPerView() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        }

        function buildDots() {
            dotsContainer.innerHTML = '';
            var totalDots = maxIndex + 1;
            for (var i = 0; i < totalDots; i++) {
                var dot = document.createElement('span');
                dot.className = 'testimonial-dot' + (i === currentIndex ? ' active' : '');
                dot.setAttribute('data-index', i);
                dot.addEventListener('click', function () {
                    goToSlide(parseInt(this.getAttribute('data-index'), 10));
                });
                dotsContainer.appendChild(dot);
            }
        }

        function updateSlider() {
            var gap = 28;
            var cardWidth = cards[0].getBoundingClientRect().width;
            var offset = currentIndex * (cardWidth + gap);
            track.style.transform = 'translateX(-' + offset + 'px)';

            var dots = dotsContainer.querySelectorAll('.testimonial-dot');
            dots.forEach(function (dot, i) {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            updateSlider();
        }

        prevBtn.addEventListener('click', function () {
            goToSlide(currentIndex - 1);
        });

        nextBtn.addEventListener('click', function () {
            goToSlide(currentIndex + 1);
        });

        var resizeTimeout;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function () {
                cardsPerView = getCardsPerView();
                maxIndex = Math.max(0, cards.length - cardsPerView);
                if (currentIndex > maxIndex) currentIndex = maxIndex;
                buildDots();
                updateSlider();
            }, 200);
        });

        buildDots();
        updateSlider();

        /* Auto-slide */
        var autoSlideInterval = setInterval(function () {
            if (currentIndex >= maxIndex) {
                goToSlide(0);
            } else {
                goToSlide(currentIndex + 1);
            }
        }, 5000);

        track.closest('.testimonials-slider').addEventListener('mouseenter', function () {
            clearInterval(autoSlideInterval);
        });

        track.closest('.testimonials-slider').addEventListener('mouseleave', function () {
            autoSlideInterval = setInterval(function () {
                if (currentIndex >= maxIndex) {
                    goToSlide(0);
                } else {
                    goToSlide(currentIndex + 1);
                }
            }, 5000);
        });

        /* Touch / Swipe support */
        var touchStartX = 0;
        var touchEndX = 0;

        track.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToSlide(currentIndex + 1);
                } else {
                    goToSlide(currentIndex - 1);
                }
            }
        }, { passive: true });
    }

    /* --- Smooth scroll for anchor links --- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var navHeight = navbar.offsetHeight + 20;
                var targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetTop, behavior: 'smooth' });
            }
        });
    });

    /* --- Active nav link on scroll --- */
    var sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        var scrollPos = window.pageYOffset + navbar.offsetHeight + 100;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            var link = document.querySelector('.nav-link[href="#' + id + '"]');
            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    link.style.color = 'var(--color-primary)';
                } else {
                    link.style.color = '';
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
})();
