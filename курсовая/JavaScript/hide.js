document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('menu-toggle');
    const menuItems = document.querySelectorAll('.menu-item');

    toggleBtn.addEventListener('click', function(event) {
        event.preventDefault(); // чтобы ссылка не прыгала наверх страницы
        menuItems.forEach(item => {
            if (item.style.display === 'none') {
                item.style.display = 'list-item'; // показываем
            } else {
                item.style.display = 'none'; // скрываем
            }
        });
    });
});
toggleBtn.addEventListener('click', function(event) {
    event.preventDefault();
    menuItems.forEach(item => {
        item.classList.toggle('hidden');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Для каждого товара в корзине
    document.querySelectorAll('.cart-item').forEach(item => {
      const priceElem = item.querySelector('h3');
      const quantityInput = item.querySelector('input[type="number"]');
      const plusBtn = item.querySelector('.quantity-controls button:nth-child(1)');
      const minusBtn = item.querySelector('.quantity-controls button:nth-child(3)');
  
      // Получаем базовую цену из текста h3, например "Садовое ассорти 1600 рублей"
      const priceText = priceElem.textContent;
      const priceMatch = priceText.match(/(\d+)\s*руб/);
      if (!priceMatch) return;
      const basePrice = parseInt(priceMatch[1], 10);
      const productName = priceText.replace(/\d+\s*руб.*/i, '').trim();
  
      function updatePrice() {
        const quantity = parseInt(quantityInput.value, 10);
        const newPrice = basePrice * quantity;
        priceElem.textContent = `${productName} ${newPrice} рублей`;
        updateOrderSummary();
      }
  
      plusBtn.addEventListener('click', () => {
        quantityInput.value = Math.max(1, parseInt(quantityInput.value, 10) + 1);
        updatePrice();
      });
  
      minusBtn.addEventListener('click', () => {
        quantityInput.value = Math.max(1, parseInt(quantityInput.value, 10) - 1);
        updatePrice();
      });
  
      quantityInput.addEventListener('input', () => {
        if (quantityInput.value === '' || parseInt(quantityInput.value, 10) < 1) {
          quantityInput.value = 1;
        }
        updatePrice();
      });
  
      // Инициализация
      updatePrice();
    });
  
    // Обновление итоговой суммы заказа
    function updateOrderSummary() {
      let total = 0;
      let summaryHtml = '';
      document.querySelectorAll('.cart-item').forEach(item => {
        const priceElem = item.querySelector('h3');
        const priceText = priceElem.textContent;
        const priceMatch = priceText.match(/(\d+)\s*руб/);
        const productName = priceText.replace(/\d+\s*руб.*/i, '').trim();
        if (priceMatch) {
          total += parseInt(priceMatch[1], 10);
          summaryHtml += `<h3>${productName} ${priceMatch[1]} РУБЛЕЙ</h3>`;
        }
      });
      document.querySelector('.order-summary').innerHTML = `
        ${summaryHtml}
        <p>Адрес доставки: Г.карасук, ул. Ленина, 120</p>
        <p>Доставка: Бесплатно</p>
        <h2>Всего: ${total} рублей</h2>
        <button class="buy-button"><a href="6.html">Купить</a></button>
      `;
    }
  
    updateOrderSummary();
  
    // Сохранение товаров для передачи на страницу заказа
    document.querySelector('.order-summary').addEventListener('click', function(e) {
      if (e.target.closest('.buy-button')) {
        // Собираем данные о товарах
        const orderItems = [];
        document.querySelectorAll('.cart-item').forEach(item => {
          const img = item.querySelector('img').getAttribute('src');
          const priceElem = item.querySelector('h3');
          const priceText = priceElem.textContent;
          const priceMatch = priceText.match(/(\d+)\s*руб/);
          const productName = priceText.replace(/\d+\s*руб.*/i, '').trim();
          const quantity = item.querySelector('input[type="number"]').value;
          if (priceMatch) {
            orderItems.push({
              img,
              name: productName,
              price: parseInt(priceMatch[1], 10),
              quantity: parseInt(quantity, 10)
            });
          }
        });
        // Сохраняем в localStorage
        localStorage.setItem('lastOrder', JSON.stringify(orderItems));
      }
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    // Ваш существующий код по рендеру корзины и обновлению количества...
  
    // Добавляем обработчик на кнопку "Купить"
    document.querySelector('.buy-button').addEventListener('click', (e) => {
      e.preventDefault(); // Чтобы не было мгновенного перехода
  
      // Собираем данные о товарах из cartItems
      const orderData = cartItems.map(item => ({
        img: item.img,
        name: item.title.replace(/\d+\s*руб.*/i, '').trim(),
        price: (() => {
          const match = item.title.match(/(\d+)\s*руб/);
          return match ? parseInt(match[1], 10) : 0;
        })(),
        quantity: item.quantity
      }));
  
      // Сохраняем в localStorage
      localStorage.setItem('orderData', JSON.stringify(orderData));
  
      // Переходим на страницу заказа
      window.location.href = '6.html'; // или нужный URL страницы заказа
    });
  });