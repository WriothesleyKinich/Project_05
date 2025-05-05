document.addEventListener('DOMContentLoaded', () => {
    const orderItemsContainer = document.querySelector('.order-items');
    const deliveryInfo = document.querySelector('.delivery-info');
  
    const orderData = JSON.parse(localStorage.getItem('orderData')) || [];
  
    let total = 0;
    orderItemsContainer.innerHTML = '';
  
    orderData.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
  
      const div = document.createElement('div');
      div.classList.add('order-item');
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="order-item-details">
          <h3>${item.name}</h3>
          <p>${item.price} рублей × ${item.quantity} = ${itemTotal} рублей</p>
        </div>
      `;
      orderItemsContainer.appendChild(div);
    });
  
    deliveryInfo.innerHTML = `
      <p>Адрес доставки: Г.Карасук ул.Сибирская 6</p>
      <p>Общая сумма заказа: ${total} рублей</p>
    `;
  });