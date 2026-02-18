document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. LOADER
    ========================================= */
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => loader.classList.add('hidden'), 800);
        }
    });

    /* =========================================
       2. MOBILE MENU
    ========================================= */
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    if (mobileMenuIcon && navLinks) {
        mobileMenuIcon.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            mobileMenuIcon.classList.toggle('active');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuIcon.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    /* =========================================
       3. SCROLL REVEAL
    ========================================= */
    const reveals = document.querySelectorAll('.reveal');

    if (reveals.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        reveals.forEach(el => revealObserver.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('active'));
    }

    /* =========================================
       4. SMOOTH SCROLL
    ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const top = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;

                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* =========================================
       5. SMART HEADER
    ========================================= */
    const header = document.getElementById('navbar');
    let lastScroll = 0;
    let ticking = false;

    if (header) {
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScroll = window.pageYOffset;

                    if (currentScroll <= 0) {
                        header.style.transform = 'translateY(0)';
                    } else if (currentScroll > lastScroll && currentScroll > 120) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }

                    lastScroll = currentScroll;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /* =========================================
       6. GALLERY LIGHTBOX
    ========================================= */
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('img01');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close-modal');
    const galleryImages = document.querySelectorAll('.gallery-item img');

    if (modal && modalImg && closeBtn) {
        galleryImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                modal.style.display = 'flex';
                modalImg.src = img.src;
                if (captionText) captionText.textContent = img.alt || '';
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });
    }
});
