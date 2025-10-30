// Shop JavaScript
const API_URL = 'http://localhost:5090/api';
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

$(document).ready(function() {
    loadProducts();
    updateCartUI();
});

// Load Products
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();

        let html = '';
        products.forEach(product => {
            html += `
                <div class="product-card">
                    <div class="product-image">
                        <i class="fas fa-image" style="font-size: 3rem; color: #999;"></i>
                    </div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">₹${product.price}</div>
                    <div class="product-desc">${product.description}</div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="button is-danger is-fullwidth" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i>&nbsp; कार्ट में डालें
                        </button>
                        <button class="button is-danger" onclick="buyNow(${product.id})">
                            <i class="fas fa-bolt"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        $('#productsGrid').html(html);
    } catch (error) {
        console.error('Error loading products:', error);
        $('#productsGrid').html('<p style="text-align:center; color:#7a7a7a;">प्रोडक्ट्स लोड नहीं हो सके</p>');
    }
}

// Add to Cart
async function addToCart(productId) {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        const product = await response.json();

        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        saveCart();
        updateCartUI();

        // Show notification
        showNotification('कार्ट में जोड़ा गया!');
    } catch (error) {
        alert('Error adding to cart');
    }
}

// Buy Now
async function buyNow(productId) {
    await addToCart(productId);
    toggleCart();
}

// Update Cart UI
function updateCartUI() {
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('#cartCount').text(totalItems);

    // Update cart items
    let html = '';
    if (cart.length === 0) {
        html = '<div style="padding: 2rem; text-align: center; color: #7a7a7a;">कार्ट खाली है</div>';
    } else {
        cart.forEach(item => {
            html += `
                <div class="cart-item">
                    <div class="cart-item-image"></div>
                    <div class="cart-item-details">
                        <div style="font-weight: 600; margin-bottom: 0.25rem;">${item.name}</div>
                        <div style="color: #f14668; font-weight: 700;">₹${item.price}</div>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <button class="button is-small" onclick="decreaseQuantity(${item.id})">-</button>
                            <span style="font-weight: 600;">${item.quantity}</span>
                            <button class="button is-small" onclick="increaseQuantity(${item.id})">+</button>
                            <button class="button is-small is-danger" onclick="removeFromCart(${item.id})" style="margin-left: auto;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    $('#cartItems').html(html);

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    $('#cartTotal').text(`₹${total}`);
}

// Increase Quantity
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        saveCart();
        updateCartUI();
    }
}

// Decrease Quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Save Cart
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Toggle Cart
function toggleCart() {
    $('#cartSidebar').toggleClass('active');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('कार्ट खाली है!');
        return;
    }

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
        if (confirm('कृपया पहले लॉग इन करें। लॉग इन पेज पर जाएं?')) {
            window.location.href = 'login.html';
        }
        return;
    }

    // Go to checkout page
    window.location.href = 'checkout.html';
}

// Show Notification
function showNotification(message) {
    const notification = $('<div>')
        .text(message)
        .css({
            position: 'fixed',
            top: '80px',
            right: '20px',
            background: '#48c78e',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            zIndex: 1000,
            fontWeight: '600'
        })
        .appendTo('body');

    setTimeout(() => {
        notification.fadeOut(300, function() {
            $(this).remove();
        });
    }, 2000);
}
