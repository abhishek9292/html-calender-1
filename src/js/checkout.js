// Checkout JavaScript
const API_URL = 'http://localhost:5090/api';
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let selectedPayment = 'cod';

$(document).ready(function() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
        alert('कृपया पहले लॉग इन करें');
        window.location.href = 'login.html';
        return;
    }

    // Check if cart is empty
    if (cart.length === 0) {
        alert('कार्ट खाली है!');
        window.location.href = 'shop.html';
        return;
    }

    renderOrderSummary();
});

// Render Order Summary
function renderOrderSummary() {
    let html = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        html += `
            <div class="order-item">
                <div>
                    <div style="font-weight: 600;">${item.name}</div>
                    <div style="font-size: 0.85rem; color: #7a7a7a;">
                        ${item.quantity} × ₹${item.price}
                    </div>
                </div>
                <div style="font-weight: 700;">₹${itemTotal}</div>
            </div>
        `;
    });

    $('#orderSummary').html(html);
    $('#totalAmount').text(`₹${total}`);
}

// Select Payment Method
function selectPayment(method) {
    selectedPayment = method;

    // Update UI
    $('.payment-option').removeClass('selected');
    $(`.payment-option input[value="${method}"]`).prop('checked', true).closest('.payment-option').addClass('selected');

    // Show/hide payment details
    $('#cardDetails, #upiDetails').hide();
    if (method === 'card') {
        $('#cardDetails').show();
    } else if (method === 'upi') {
        $('#upiDetails').show();
    }
}

// Place Order
async function placeOrder() {
    // Validate shipping address
    const fullName = $('#fullName').val().trim();
    const phone = $('#phone').val().trim();
    const address = $('#address').val().trim();
    const pincode = $('#pincode').val().trim();

    if (!fullName || !phone || !address || !pincode) {
        alert('कृपया सभी फील्ड भरें');
        return;
    }

    if (phone.length !== 10) {
        alert('कृपया सही फोन नंबर डालें');
        return;
    }

    if (pincode.length !== 6) {
        alert('कृपया सही पिनकोड डालें');
        return;
    }

    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Prepare order data
    const orderData = {
        items: cart,
        total: total,
        payment_method: selectedPayment,
        shipping_address: {
            fullName,
            phone,
            address,
            pincode
        }
    };

    try {
        // Show loading
        $('.button').prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Processing...');

        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (response.ok) {
            // Clear cart
            localStorage.removeItem('cart');

            // Show success message
            alert(`✅ ऑर्डर सफलतापूर्वक प्लेस हो गया!\n\nOrder ID: ${data.order.id}\n\nआपका ऑर्डर जल्द ही डिलीवर किया जाएगा।`);

            // Redirect to home
            window.location.href = 'index.html';
        } else {
            alert('Error: ' + (data.error || 'Order failed'));
            $('.button').prop('disabled', false).html('<i class="fas fa-check-circle"></i>&nbsp; ऑर्डर प्लेस करें');
        }
    } catch (error) {
        console.error('Error placing order:', error);
        alert('सर्वर से कनेक्ट नहीं हो पा रहा। कृपया बाद में पुन: प्रयास करें।');
        $('.button').prop('disabled', false).html('<i class="fas fa-check-circle"></i>&nbsp; ऑर्डर प्लेस करें');
    }
}
