document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.favorites-grid');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    function renderFavorites() {
        grid.innerHTML = '';
        if (favorites.length === 0) {
            grid.innerHTML = '<p>Нет избранных товаров.</p>';
        } else {
            favorites.forEach((fav, index) => {
                grid.innerHTML += `
                <div class="favorite-item">
                    <img src="${fav.img}" alt="${fav.alt}">
                    <h3>${fav.title} ${fav.price}</h3>
                    <div class="quantity-controls">
                        <button>+</button>
                        <input type="number" value="1" min="1">
                        <button>-</button>
                        <button class="remove" data-index="${index}">X</button>
                    </div>
                </div>
                `;
            });
        }

        // Навешиваем обработчик на X (удалить)
        document.querySelectorAll('.remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = this.getAttribute('data-index');
                favorites.splice(idx, 1);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                renderFavorites();
            });
        });
    }

    renderFavorites();
});