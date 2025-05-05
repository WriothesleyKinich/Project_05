(function() {
    const slider = document.querySelector('.catalog-grid');
    const items = document.querySelectorAll('.catalog-item');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    const visibleCount = 3; // сколько показываем одновременно
    const totalItems = items.length;
    let currentIndex = 0;

    function updateSlider() {
      const itemWidth = items[0].offsetWidth + 15; // ширина + gap
      const offset = -currentIndex * itemWidth;
      slider.style.transform = `translateX(${offset}px)`;

      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= totalItems - visibleCount;
    }

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < totalItems - visibleCount) {
        currentIndex++;
        updateSlider();
      }
    });

    // Инициализация
    updateSlider();
  })();

  