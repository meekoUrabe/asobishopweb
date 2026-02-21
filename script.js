    const carousel = document.getElementById('featuredCarousel');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (carousel && nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                // Scrolls by the width of the viewport
                carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
            });

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
    });
        }



        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', function(e) {
                e.preventDefault();
                const t = document.querySelector(this.getAttribute('href'));
                if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // Scroll reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // Form
        function handleSubmit(e) {
            e.preventDefault();
            alert("Thanks for reaching out! We'll get back to you soon. ⚡");
            e.target.reset();
        }

        // Parallax
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < window.innerHeight)
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        });