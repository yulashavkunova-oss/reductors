// Данные о товарах
const products = [
  {
    id: 1,
    name: "Червячный редуктор",
    description: "Компактный, с высоким передаточным числом. Используется в подъёмниках и конвейерах.",
    quantity: "много",
    image: "https://via.placeholder.com/300x200?text=Червячный"
  },
  {
    id: 2,
    name: "Цилиндрический редуктор",
    description: "Высокий КПД и надёжность. Применяется в промышленном оборудовании.",
    quantity: "много",
    image: "https://via.placeholder.com/300x200?text=Цилиндрический"
  },
  {
    id: 3,
    name: "Коническо-цилиндрический редуктор",
    description: "Позволяет изменять направление вращения. Используется в тяжёлой технике.",
    quantity: "мало",
    image: "https://via.placeholder.com/300x200?text=Коническо-цилиндрический"
  },
  {
    id: 4,
    name: "Планетарный редуктор",
    description: "Компактный и мощный. Применяется в робототехнике и станках.",
    quantity: "мало",
    image: "https://via.placeholder.com/300x200?text=Планетарный"
  }
];

// Инициализация корзины
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Отображение товаров
function renderProducts() {
  const container = document.getElementById('products-container');
  container.innerHTML = products.map(product => `
    <div class="product-card">
      <div class="product-img">
        <img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;">
      </div>
      <div class="product-info">
        <div class="product-title">${product.name}</div>
        <div class="product-desc">${product.description}</div>
        <div class="product-quantity">Наличие: ${product.quantity}</div>
        <button class="add-to-cart" data-id="${product.id}">В корзину</button>
      </div>
    </div>
  `).join('');
}

// Добавление в корзину
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    const maxQty = product.quantity === "много" ? 10 : 3;
    existing.quantity = Math.min(existing.quantity + 1, maxQty);
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartUI();
  alert(`Товар "${product.name}" добавлен в корзину!`);
}

// Сохранение корзины
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Обновление UI корзины
function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}

// Открытие корзины
function openCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
    cartTotal.textContent = 'Всего товаров: 0';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <span>${item.name} × ${item.quantity}</span>
        <span>Наличие: ${item.quantity <= 3 ? 'мало' : 'много'}</span>
      </div>
    `).join('');
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = `Всего товаров: ${total}`;
  }
  
  document.getElementById('cart-modal').style.display = 'block';
}

// Закрытие корзины
function closeCart() {
  document.getElementById('cart-modal').style.display = 'none';
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();

  // Обработчики событий
  document.getElementById('cart-toggle').addEventListener('click', openCart);
  document.getElementById('close-cart').addEventListener('click', closeCart);
  document.getElementById('cart-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('cart-modal')) {
      closeCart();
    }
  });

  // Делегирование событий для кнопок "В корзину"
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      const id = parseInt(e.target.dataset.id);
      addToCart(id);
    }
  });
});