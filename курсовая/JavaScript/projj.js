const slides = [
    {
        img: "images/p13.png",
        caption: "Весенняя красота"
    },
    {
        img: "images/p144.png",
        caption: "Цветущее великолепие"
    },
    {
        img: "images/p155.png",
        caption: "Заколдованные лепестки"
    }
    // Если слайдов больше, добавьте сюда
];

let current = 0; // индекс первого видимого слайда

function renderSlides() {
    const sliderImages = document.getElementById('slider-images');
    sliderImages.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const slideIndex = (current + i) % slides.length;
        const slide = slides[slideIndex];
        const div = document.createElement('div');
        div.className = 'slider-item';
        div.innerHTML = `
            <img src="${slide.img}" alt="${slide.caption}" />
            <p>${slide.caption}</p>
        `;
        sliderImages.appendChild(div);
    }
}

document.getElementById('arrow-left').onclick = function() {
    current = (current - 1 + slides.length) % slides.length;
    renderSlides();
};
document.getElementById('arrow-right').onclick = function() {
    current = (current + 1) % slides.length;
    renderSlides();
};

// Первый рендер
renderSlides();