document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger);

    // --- NAVBAR Y MENÚ MÓVIL ---
    const navbar = document.getElementById("navbar");
    const navToggle = document.getElementById("mobile-menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    const navLinks = gsap.utils.toArray('.nav-link');
    const sections = gsap.utils.toArray('main > section');

    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    ScrollTrigger.create({
        start: "top top", end: 99999,
        onUpdate: self => navbar.classList.toggle("scrolled", self.scroll() > 50)
    });

    gsap.utils.toArray('.section-dark, .hero').forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 80px",
            end: "bottom 80px",
            toggleClass: { targets: navbar, className: "nav-dark" }
        });
    });

    sections.forEach(section => {
        if(section.id) {
            ScrollTrigger.create({
                trigger: section, start: "top center", end: "bottom center",
                onToggle: self => self.isActive && setActive(section.id)
            });
        }
    });

    function setActive(id) {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    }

    // --- ANIMACIONES DE SCROLL GENERALES ---
    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 50 }, {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" }
        });
    });

    gsap.utils.toArray('.animate-text').forEach(text => {
        let words = text.innerText.split(' ');
        text.innerHTML = '';
        words.forEach(word => {
            let span = document.createElement('span');
            span.innerHTML = `${word}&nbsp;`;
            let wrapper = document.createElement('div');
            wrapper.appendChild(span);
            text.appendChild(wrapper);
        });
        gsap.from(text.querySelectorAll('span'), {
            y: '100%', duration: 1, stagger: 0.05, ease: 'power3.out',
            scrollTrigger: { trigger: text, start: 'top 90%' }
        });
    });

    gsap.utils.toArray('.parallax-img').forEach(img => {
        gsap.to(img, {
            yPercent: -15, ease: "none",
            scrollTrigger: { trigger: img.closest('.image-container'), start: "top bottom", end: "bottom top", scrub: true }
        });
    });

    // --- CARRUSEL DE PRODUCTOS CON FLECHAS ---
    const track = document.querySelector('.horizontal-scroll-track');
    const slides = gsap.utils.toArray('.product-slide');
    const nextBtn = document.getElementById('scroll-next');
    const prevBtn = document.getElementById('scroll-prev');

    if (track && slides.length > 0 && nextBtn && prevBtn) {
        let currentIndex = 0;
        const numSlides = slides.length;

        function updateButtons() {
            prevBtn.classList.toggle('disabled', currentIndex === 0);
            nextBtn.classList.toggle('disabled', currentIndex === numSlides - 1);
        }

        function goToSlide(index) {
            gsap.to(track, {
                x: -slides[index].offsetLeft + track.parentElement.offsetLeft,
                duration: 0.8,
                ease: 'power3.inOut'
            });
            currentIndex = index;
            updateButtons();
        }

        nextBtn.addEventListener('click', () => {
            if (currentIndex < numSlides - 1) {
                goToSlide(currentIndex + 1);
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        });

        // Estado inicial de los botones
        updateButtons();
    }


    // --- BOTÓN FLOTANTE ---
    gsap.fromTo("#floating-cta", 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
});