document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalElement = document.querySelector('.total');
  const checkoutButton = document.querySelector('.checkout');
  const cancelButton = document.querySelector('.cancel');
  const overlay = document.querySelector('.overlay');
  const checkoutForm = document.getElementById('checkout-form');
  const orderSuccessPopup = document.getElementById('order-success');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });

  cancelButton.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  checkoutButton.addEventListener('click', () => {
    overlay.style.display = 'block';
  });

  checkoutForm.addEventListener('submit', function(event) {
    event.preventDefault();
    showOrderSuccessPopup();
  });

  function addToCart(event) {
    const product = event.target.closest('.box');
    const productName = product.querySelector('h3').textContent;
    const productPrice = parseFloat(product.querySelector('.product-price').textContent.replace('₱', ''));
    const productQuantity = parseInt(product.querySelector('.product-quantity').value);

    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
      <span class="item-name">${productName}</span>
      <span class="item-price">₱${(productPrice * productQuantity).toFixed(2)}</span>
      <span class="item-quantity">${productQuantity}</span>
      <button class="remove-item">Remove</button>
    `;

    const removeButton = cartItem.querySelector('.remove-item');
    removeButton.addEventListener('click', removeItem);

    cartItemsContainer.appendChild(cartItem);
    updateTotal();
  }

  function removeItem(event) {
    const item = event.target.parentElement;
    item.remove();
    updateTotal();
  }

  function updateTotal() {
    const cartItems = document.querySelectorAll('.cart-items li');
    let total = 0;

    cartItems.forEach(item => {
      const itemPrice = parseFloat(item.querySelector('.item-price').textContent.replace('₱', ''));
      total += itemPrice;
    });

    totalElement.textContent = `₱${total.toFixed(2)}`;
  }

  function showOrderSuccessPopup() {
    overlay.style.display = 'none';
    orderSuccessPopup.style.display = 'block';
  }
});
