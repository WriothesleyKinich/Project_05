document.addEventListener('DOMContentLoaded', function() {
    // Находим все сердечки
    document.querySelectorAll('.catalog-item a:last-child').forEach(function(heartBtn) {
        heartBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Находим родительский блок товара
            const item = heartBtn.closest('.catalog-item');
            const img = item.querySelector('img').getAttribute('src');
            const alt = item.querySelector('img').getAttribute('alt');
            const price = item.querySelector('h3').innerText;
            const title = item.querySelector('p').innerText;

            // Объект избранного товара
            const favorite = {
                img: img,
                alt: alt,
                price: price,
                title: title
            };

            // Получаем существующий массив избранного из LocalStorage
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            // Проверка на дубликаты (по alt+price)
            const isExists = favorites.some(fav => fav.alt === favorite.alt && fav.price === favorite.price);
            if (!isExists) {
                favorites.push(favorite);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert('Добавлено в избранное!');
            } else {
                alert('Этот товар уже в избранном.');
            }
        });
    });
});