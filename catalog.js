 // Функция для обновления отображаемого значения цены
 function updatePriceValue() {
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    priceValue.textContent = priceRange.value + ' ₽';
    filterProductsByPrice(priceRange.value);
}

// Фильтрация товаров по цене
function filterProductsByPrice(maxPrice) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productPrice = parseInt(product.getAttribute('data-price'));
        if (productPrice <= maxPrice) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Добавление обработчика событий для ползунка
document.getElementById('price-range').addEventListener('input', updatePriceValue);

// Инициализация отображаемого значения при загрузке страницы
updatePriceValue();

document.getElementById('category').addEventListener('change', function() {
    const subcategories = document.getElementById('subcategories');
    if (this.value === 'men' || this.value === 'women') {
        subcategories.classList.add('active');
    } else {
        subcategories.classList.remove('active');
    }
});

function addToCart(button) {
    const product = button.closest('.product');
    const clone = product.cloneNode(true);
    const rect = product.getBoundingClientRect();

    clone.style.position = 'fixed';
    clone.style.left = rect.left + 'px';
    clone.style.top = rect.top + 'px';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.transition = 'transform 1s ease, opacity 1s ease';

    document.body.appendChild(clone);

    setTimeout(() => {
        clone.classList.add('fly-animation');
    }, 100);

    setTimeout(() => {
        clone.remove();
        addProductToCart(product);
    }, 1000);
}

function addProductToCart(product) {
    const productId = product.getAttribute('data-id');
    const productName = product.getAttribute('data-name');
    const productPrice = product.getAttribute('data-price');
    const productCategory = product.getAttribute('data-category');
    const productSubcategory = product.getAttribute('data-subcategory');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            category: productCategory,
            subcategory: productSubcategory,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

