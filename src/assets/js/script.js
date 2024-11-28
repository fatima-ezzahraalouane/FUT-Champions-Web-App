// carousel
const carousel = document.querySelector('.carousel-wrapper');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let offset = 0;

nextBtn.addEventListener('click', () => {
    if (offset > -480) { // Limite maximale (5 rangees * 120px)
        offset -= 120; // Chaque clic fait defiler une rangee
        carousel.style.transform = `translateY(${offset}px)`;
    }
});

prevBtn.addEventListener('click', () => {
    if (offset < 0) { // Limite minimale
        offset += 120;
        carousel.style.transform = `translateY(${offset}px)`;
    }
});

