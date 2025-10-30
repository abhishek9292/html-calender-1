# -*- coding: utf-8 -*-
"""
भारत कैलेंडर - Full Stack Backend
Complete backend with authentication, admin panel, shopping, and database management
"""

from flask import Flask, jsonify, request, send_from_directory, session
from flask_cors import CORS
import json
import os
from datetime import datetime
from functools import wraps
import uuid

app = Flask(__name__, static_folder='../src')
app.secret_key = 'bharatcalendar_secret_key_2025'  # Change in production

# Configure CORS properly
CORS(app,
     resources={r"/*": {"origins": "*"}},
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

# Database paths
DB_DIR = os.path.join(os.path.dirname(__file__), 'db')
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')

# ========== HELPER FUNCTIONS ==========

def load_db(filename):
    """Load JSON database file"""
    try:
        filepath = os.path.join(DB_DIR, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return {}

def save_db(filename, data):
    """Save JSON database file"""
    try:
        filepath = os.path.join(DB_DIR, filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        print(f"Error saving {filename}: {e}")
        return False

def require_auth(f):
    """Decorator for routes that require authentication"""
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Authentication required'}), 401
        return f(*args, **kwargs)
    return decorated

def require_admin(f):
    """Decorator for routes that require admin role"""
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Authentication required'}), 401
        if session.get('role') != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        return f(*args, **kwargs)
    return decorated

# ========== AUTHENTICATION APIs ==========

@app.route('/api/auth/login', methods=['POST'])
def login():
    """User login"""
    data = request.json
    username = data.get('username')
    password = data.get('password')

    users_db = load_db('users.json')
    user = next((u for u in users_db.get('users', [])
                if u['username'] == username and u['password'] == password), None)

    if user:
        session['user_id'] = user['id']
        session['username'] = user['username']
        session['role'] = user['role']
        return jsonify({
            'success': True,
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'role': user['role']
            }
        })
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/auth/register', methods=['POST'])
def register():
    """User registration"""
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    if not all([username, password, email]):
        return jsonify({'error': 'All fields required'}), 400

    users_db = load_db('users.json')

    # Check if username exists
    if any(u['username'] == username for u in users_db.get('users', [])):
        return jsonify({'error': 'Username already exists'}), 400

    # Create new user
    new_user = {
        'id': len(users_db.get('users', [])) + 1,
        'username': username,
        'password': password,  # In production, use proper hashing
        'email': email,
        'role': 'user',
        'created': datetime.now().isoformat()
    }

    users_db.setdefault('users', []).append(new_user)
    save_db('users.json', users_db)

    return jsonify({'success': True, 'message': 'Registration successful'})

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    """User logout"""
    session.clear()
    return jsonify({'success': True})

@app.route('/api/auth/me')
@require_auth
def get_current_user():
    """Get current logged-in user info"""
    return jsonify({
        'id': session['user_id'],
        'username': session['username'],
        'role': session['role']
    })

# ========== PAGE MANAGEMENT APIs ==========

@app.route('/api/pages')
def get_pages():
    """Get all pages"""
    pages_db = load_db('pages.json')
    return jsonify(pages_db.get('pages', []))

@app.route('/api/pages/<page_id>')
def get_page(page_id):
    """Get specific page"""
    pages_db = load_db('pages.json')
    page = next((p for p in pages_db.get('pages', []) if p['id'] == page_id), None)
    if page:
        return jsonify(page)
    return jsonify({'error': 'Page not found'}), 404

@app.route('/api/pages', methods=['POST'])
@require_admin
def create_page():
    """Create new page"""
    data = request.json
    pages_db = load_db('pages.json')

    new_page = {
        'id': data.get('slug') or data.get('title').lower().replace(' ', '-'),
        'title': data.get('title'),
        'slug': data.get('slug'),
        'sections': [],
        'active': True,
        'created': datetime.now().isoformat()
    }

    pages_db.setdefault('pages', []).append(new_page)
    save_db('pages.json', pages_db)

    return jsonify({'success': True, 'page': new_page})

@app.route('/api/pages/<page_id>', methods=['PUT'])
@require_admin
def update_page(page_id):
    """Update page"""
    data = request.json
    pages_db = load_db('pages.json')

    page = next((p for p in pages_db.get('pages', []) if p['id'] == page_id), None)
    if not page:
        return jsonify({'error': 'Page not found'}), 404

    page.update(data)
    save_db('pages.json', pages_db)

    return jsonify({'success': True, 'page': page})

@app.route('/api/pages/<page_id>', methods=['DELETE'])
@require_admin
def delete_page(page_id):
    """Delete page"""
    pages_db = load_db('pages.json')
    pages_db['pages'] = [p for p in pages_db.get('pages', []) if p['id'] != page_id]
    save_db('pages.json', pages_db)

    return jsonify({'success': True})

# ========== NAVIGATION APIs ==========

@app.route('/api/navigation')
def get_navigation():
    """Get navigation"""
    nav_db = load_db('navigation.json')
    return jsonify(nav_db)

@app.route('/api/navigation', methods=['PUT'])
@require_admin
def update_navigation():
    """Update navigation"""
    data = request.json
    save_db('navigation.json', data)
    return jsonify({'success': True})

# ========== PRODUCT APIs ==========

@app.route('/api/products')
def get_products():
    """Get all products"""
    products_db = load_db('products.json')
    products = products_db.get('products', [])

    # Filter active products for non-admin
    if session.get('role') != 'admin':
        products = [p for p in products if p.get('active', True)]

    return jsonify(products)

@app.route('/api/products/<int:product_id>')
def get_product(product_id):
    """Get specific product"""
    products_db = load_db('products.json')
    product = next((p for p in products_db.get('products', []) if p['id'] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({'error': 'Product not found'}), 404

@app.route('/api/products', methods=['POST'])
@require_admin
def create_product():
    """Create new product"""
    data = request.json
    products_db = load_db('products.json')

    new_product = {
        'id': len(products_db.get('products', [])) + 1,
        **data,
        'created': datetime.now().isoformat()
    }

    products_db.setdefault('products', []).append(new_product)
    save_db('products.json', products_db)

    return jsonify({'success': True, 'product': new_product})

@app.route('/api/products/<int:product_id>', methods=['PUT'])
@require_admin
def update_product(product_id):
    """Update product"""
    data = request.json
    products_db = load_db('products.json')

    product = next((p for p in products_db.get('products', []) if p['id'] == product_id), None)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    product.update(data)
    save_db('products.json', products_db)

    return jsonify({'success': True, 'product': product})

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
@require_admin
def delete_product(product_id):
    """Delete product"""
    products_db = load_db('products.json')
    products_db['products'] = [p for p in products_db.get('products', []) if p['id'] != product_id]
    save_db('products.json', products_db)

    return jsonify({'success': True})

# ========== ORDER APIs ==========

@app.route('/api/orders', methods=['POST'])
@require_auth
def create_order():
    """Create new order"""
    data = request.json
    orders_db = load_db('orders.json')

    new_order = {
        'id': str(uuid.uuid4()),
        'user_id': session['user_id'],
        'items': data.get('items', []),
        'total': data.get('total', 0),
        'payment_method': data.get('payment_method', 'cod'),
        'status': 'pending',
        'shipping_address': data.get('shipping_address', {}),
        'created': datetime.now().isoformat()
    }

    orders_db.setdefault('orders', []).append(new_order)
    save_db('orders.json', orders_db)

    return jsonify({'success': True, 'order': new_order})

@app.route('/api/orders')
@require_auth
def get_orders():
    """Get user orders"""
    orders_db = load_db('orders.json')

    if session.get('role') == 'admin':
        orders = orders_db.get('orders', [])
    else:
        orders = [o for o in orders_db.get('orders', []) if o['user_id'] == session['user_id']]

    return jsonify(orders)

@app.route('/api/orders/<order_id>', methods=['PUT'])
@require_admin
def update_order(order_id):
    """Update order status"""
    data = request.json
    orders_db = load_db('orders.json')

    order = next((o for o in orders_db.get('orders', []) if o['id'] == order_id), None)
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    order['status'] = data.get('status', order['status'])
    save_db('orders.json', orders_db)

    return jsonify({'success': True, 'order': order})

# ========== DB BROWSER API ==========

@app.route('/api/admin/db/<collection>')
@require_admin
def get_db_collection(collection):
    """Get database collection"""
    db = load_db(f'{collection}.json')
    return jsonify(db)

@app.route('/api/admin/db/<collection>', methods=['PUT'])
@require_admin
def update_db_collection(collection):
    """Update entire collection"""
    data = request.json
    save_db(f'{collection}.json', data)
    return jsonify({'success': True})

# ========== CALENDAR DATA APIs (from original) ==========

@app.route('/api/panchang/<date>')
def get_panchang(date):
    """Get Panchang data"""
    data_file = os.path.join(DATA_DIR, f'panchang_{date}.json')
    if os.path.exists(data_file):
        with open(data_file, 'r', encoding='utf-8') as f:
            return jsonify(json.load(f))
    return jsonify({'error': 'Not found'}), 404

# ========== STATIC FILES ==========

@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

# ========== RUN SERVER ==========

if __name__ == '__main__':
    # Create directories
    os.makedirs(DB_DIR, exist_ok=True)
    os.makedirs(DATA_DIR, exist_ok=True)

    print("🚀 भारत कैलेंडर Full Stack Backend Starting...")
    print("📡 Server: http://localhost:5000")
    print("📂 Database: ", DB_DIR)
    print("✅ Admin Login: admin / admin123")

    app.run(debug=True, host='0.0.0.0', port=5090)
