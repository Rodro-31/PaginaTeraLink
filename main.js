// Smooth scroll para navegación

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({

            behavior: 'smooth'

        });

    });

});

// Carrusel interactivo (UX prototipo clicable)
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.carousel-button.prev');
const nextBtn = document.querySelector('.carousel-button.next');
let currentSlide = 0;
let carouselInterval = null;

const updateCarousel = (index) => {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        indicators[i].classList.toggle('active', i === index);
        indicators[i].setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
    currentSlide = index;
};

const showNext = () => updateCarousel((currentSlide + 1) % slides.length);
const showPrev = () => updateCarousel((currentSlide - 1 + slides.length) % slides.length);

prevBtn.addEventListener('click', () => { showPrev(); resetAutoSlide(); });
nextBtn.addEventListener('click', () => { showNext(); resetAutoSlide(); });

indicators.forEach((dot) => {
    dot.addEventListener('click', () => {
        updateCarousel(Number(dot.dataset.slide));
        resetAutoSlide();
    });
});

const resetAutoSlide = () => {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(showNext, 5000);
};

// Menú móvil toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menú');
        });
    });
}

// Iniciar carrusel auto
carouselInterval = setInterval(showNext, 5000);