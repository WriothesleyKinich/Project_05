document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки X в избранном
    document.querySelectorAll('.favorite-item .quantity-controls button:last-child').forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Находим родительский элемент favorite-item и удаляем его
            const item = btn.closest('.favorite-item');
            if(item) item.remove();
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Для каждого блока с товаром
    document.querySelectorAll('.favorite-item').forEach(item => {
      const priceElem = item.querySelector('h3');
      const quantityInput = item.querySelector('input[type="number"]');
      const plusBtn = item.querySelector('.quantity-controls button:nth-child(1)'); // первый button "+"
      const minusBtn = item.querySelector('.quantity-controls button:nth-child(3)'); // третий button "-"
  
      // Получаем базовую цену из текста h3, например "Садовое ассорти 1600 рублей"
      // Извлечь число цены
      const priceText = priceElem.textContent;
      const priceMatch = priceText.match(/(\d+)\s*рублей/);
      if (!priceMatch) return; // если цена не найдена, пропускаем
  
      const basePrice = parseInt(priceMatch[1], 10);
      // Получаем название товара (все до цены)
      const productName = priceText.replace(/\d+\s*рублей/, '').trim();
  
      function updatePrice() {
        const quantity = parseInt(quantityInput.value, 10);
        const newPrice = basePrice * quantity;
        priceElem.textContent = `${productName} ${newPrice} рублей`;
      }
  
      plusBtn.addEventListener('click', () => {
        quantityInput.value = Math.max(1, parseInt(quantityInput.value, 10) + 1);
        updatePrice();
      });
  
      minusBtn.addEventListener('click', () => {
        quantityInput.value = Math.max(1, parseInt(quantityInput.value, 10) - 1);
        updatePrice();
      });
  
      // Можно обновлять цену при ручном вводе количества
      quantityInput.addEventListener('input', () => {
        if (quantityInput.value === '' || parseInt(quantityInput.value, 10) < 1) {
          quantityInput.value = 1;
        }
        updatePrice();
      });
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const favoriteGrid = document.querySelector('.favorites-grid');
  
    // Функция для сохранения товаров в localStorage
    function saveFavoritesToStorage() {
      const favorites = [];
      favoriteGrid.querySelectorAll('.favorite-item').forEach(item => {
        const img = item.querySelector('img').src;
        const titleText = item.querySelector('h3').textContent;
        const quantity = item.querySelector('input[type="number"]').value || 1;
  
        favorites.push({
          img,
          title: titleText,
          quantity: parseInt(quantity, 10)
        });
      });
      localStorage.setItem('cartItems', JSON.stringify(favorites));
    }
  
    // При изменении количества или нажатии кнопок "+" и "-"
    favoriteGrid.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        const btn = e.target;
        const item = btn.closest('.favorite-item');
        const input = item.querySelector('input[type="number"]');
        let val = parseInt(input.value, 10);
  
        if (btn.textContent === '+') {
          input.value = val + 1;
        } else if (btn.textContent === '-') {
          input.value = val > 1 ? val - 1 : 1;
        }
        saveFavoritesToStorage();
      }
    });
  
    favoriteGrid.querySelectorAll('input[type="number"]').forEach(input => {
      input.addEventListener('change', () => {
        if (input.value < 1 || isNaN(input.value)) input.value = 1;
        saveFavoritesToStorage();
      });
    });
  
    // Сохраняем данные при загрузке страницы (на случай, если уже есть изменения)
    saveFavoritesToStorage();
  });
  