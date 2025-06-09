// Script to manage cart count and user authentication
let cartCount = 0;

// Function to update cart count
function updateCartCount() {
  document.querySelectorAll('.cart-count').forEach(count => {
    count.textContent = cartCount;
  });
}

// Function to add item to cart
function addToCart() {
  cartCount++;
  updateCartCount();
  alert("Item added to cart!");
}

// Function to check if user is signed in
function checkAuth() {
  if (!localStorage.getItem('isLoggedIn')) {
    alert("Please sign in to place your order.");
    window.location.href = "signin.html";
  } else {
    alert("Proceed to place your order.");
  }
}

// Event listener for add-to-cart buttons
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', addToCart);
  });

  document.querySelectorAll('.checkout').forEach(button => {
    button.addEventListener('click', checkAuth);
  });
});