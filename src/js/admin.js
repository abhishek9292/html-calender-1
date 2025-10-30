// Admin Panel JavaScript
const API_URL = 'http://localhost:5090/api';

// Check authentication on load
$(document).ready(function() {
    checkAuth();
    loadDashboard();
});

async function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.id || user.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }

    $('#adminUsername').text(user.username);
}

// Dashboard Functions
async function loadDashboard() {
    try {
        // Load statistics
        const [users, products, orders, pages] = await Promise.all([
            fetch(`${API_URL}/admin/db/users`, {credentials: 'include'}).then(r => r.json()),
            fetch(`${API_URL}/products`, {credentials: 'include'}).then(r => r.json()),
            fetch(`${API_URL}/orders`, {credentials: 'include'}).then(r => r.json()),
            fetch(`${API_URL}/pages`, {credentials: 'include'}).then(r => r.json())
        ]);

        $('#totalUsers').text(users.users?.length || 0);
        $('#totalProducts').text(products.length || 0);
        $('#totalOrders').text(orders.length || 0);
        $('#totalPages').text(pages.length || 0);
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Section Navigation
function showSection(section) {
    // Hide all sections
    $('.section-panel').removeClass('active');
    $('.menu-item').removeClass('active');

    // Show selected section
    $(`#${section}`).addClass('active');
    $(`.menu-item:contains('${getSectionTitle(section)}')`).first().addClass('active');

    // Load data for section
    switch(section) {
        case 'pages':
            loadPages();
            break;
        case 'products':
            loadProducts();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'navigation':
            loadNavigation();
            break;
        case 'users':
            loadUsers();
            break;
    }
}

function getSectionTitle(section) {
    const titles = {
        'dashboard': 'डैशबोर्ड',
        'pages': 'पेज मैनेजमेंट',
        'products': 'प्रोडक्ट मैनेजमेंट',
        'orders': 'ऑर्डर मैनेजमेंट',
        'navigation': 'नेविगेशन मैनेजमेंट',
        'users': 'यूजर मैनेजमेंट',
        'database': 'डेटाबेस ब्राउज़र'
    };
    return titles[section] || '';
}

// Pages Management
async function loadPages() {
    try {
        const response = await fetch(`${API_URL}/pages`, {credentials: 'include'});
        const pages = await response.json();

        let html = '';
        pages.forEach(page => {
            html += `
                <tr>
                    <td>${page.id}</td>
                    <td>${page.title}</td>
                    <td>${page.slug}</td>
                    <td><span class="tag ${page.active ? 'is-success' : 'is-danger'}">${page.active ? 'Active' : 'Inactive'}</span></td>
                    <td class="table-actions">
                        <button class="button is-small is-info" onclick="editPage('${page.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="button is-small is-danger" onclick="deletePage('${page.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        $('#pagesTableBody').html(html);
    } catch (error) {
        console.error('Error loading pages:', error);
    }
}

function showAddPageModal() {
    const title = prompt('पेज शीर्षक डालें:');
    if (!title) return;

    const slug = prompt('पेज स्लग डालें:', title.toLowerCase().replace(/\s+/g, '-'));
    if (!slug) return;

    addPage({title, slug});
}

async function addPage(data) {
    try {
        const response = await fetch(`${API_URL}/pages`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('पेज जोड़ा गया!');
            loadPages();
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function deletePage(pageId) {
    if (!confirm('क्या आप इस पेज को डिलीट करना चाहते हैं?')) return;

    try {
        const response = await fetch(`${API_URL}/pages/${pageId}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (response.ok) {
            alert('पेज डिलीट हो गया!');
            loadPages();
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Products Management
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`, {credentials: 'include'});
        const products = await response.json();

        let html = '';
        products.forEach(product => {
            html += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>₹${product.price}</td>
                    <td>${product.stock}</td>
                    <td><span class="tag ${product.active ? 'is-success' : 'is-danger'}">${product.active ? 'Active' : 'Inactive'}</span></td>
                    <td class="table-actions">
                        <button class="button is-small is-info" onclick="editProduct(${product.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="button is-small is-danger" onclick="deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        $('#productsTableBody').html(html);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function showAddProductModal() {
    const name = prompt('प्रोडक्ट नाम:');
    if (!name) return;

    const price = prompt('कीमत:');
    if (!price) return;

    const stock = prompt('स्टॉक:');
    if (!stock) return;

    const description = prompt('विवरण:');

    addProduct({
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        description: description || '',
        category: 'general',
        active: true
    });
}

async function addProduct(data) {
    try {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('प्रोडक्ट जोड़ा गया!');
            loadProducts();
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function deleteProduct(productId) {
    if (!confirm('क्या आप इस प्रोडक्ट को डिलीट करना चाहते हैं?')) return;

    try {
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (response.ok) {
            alert('प्रोडक्ट डिलीट हो गया!');
            loadProducts();
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Orders Management
async function loadOrders() {
    try {
        const response = await fetch(`${API_URL}/orders`, {credentials: 'include'});
        const orders = await response.json();

        let html = '';
        orders.forEach(order => {
            const date = new Date(order.created).toLocaleDateString('hi-IN');
            html += `
                <tr>
                    <td>${order.id.substring(0, 8)}...</td>
                    <td>User #${order.user_id}</td>
                    <td>₹${order.total}</td>
                    <td><span class="tag">${order.status}</span></td>
                    <td>${date}</td>
                    <td class="table-actions">
                        <button class="button is-small is-info" onclick="updateOrderStatus('${order.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        $('#ordersTableBody').html(html || '<tr><td colspan="6">कोई ऑर्डर नहीं</td></tr>');
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

async function updateOrderStatus(orderId) {
    const status = prompt('नया स्टेटस (pending/confirmed/shipped/delivered/cancelled):');
    if (!status) return;

    try {
        const response = await fetch(`${API_URL}/orders/${orderId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({status})
        });

        if (response.ok) {
            alert('ऑर्डर स्टेटस अपडेट हो गया!');
            loadOrders();
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Navigation Management
async function loadNavigation() {
    try {
        const response = await fetch(`${API_URL}/navigation`, {credentials: 'include'});
        const nav = await response.json();

        window.navigationData = nav;

        // Render main nav
        let mainHtml = '<div class="box">';
        (nav.mainNav || []).forEach((item, index) => {
            mainHtml += `
                <div class="field has-addons" style="margin-bottom: 1rem;">
                    <input class="input" value="${item.label}" data-section="mainNav" data-index="${index}" data-field="label">
                    <input class="input" value="${item.link}" data-section="mainNav" data-index="${index}" data-field="link">
                    <input class="input" value="${item.icon}" data-section="mainNav" data-index="${index}" data-field="icon">
                    <button class="button is-danger" onclick="removeNavItem('mainNav', ${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
        mainHtml += '<button class="button is-small" onclick="addNavItem(\'mainNav\')">+ Add</button></div>';
        $('#mainNavEditor').html(mainHtml);

        // Render sidebar nav
        let sidebarHtml = '<div class="box">';
        (nav.sidebar || []).forEach((item, index) => {
            sidebarHtml += `
                <div class="field has-addons" style="margin-bottom: 1rem;">
                    <input class="input" value="${item.label}" data-section="sidebar" data-index="${index}" data-field="label">
                    <input class="input" value="${item.link}" data-section="sidebar" data-index="${index}" data-field="link">
                    <input class="input" value="${item.icon}" data-section="sidebar" data-index="${index}" data-field="icon">
                    <button class="button is-danger" onclick="removeNavItem('sidebar', ${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
        sidebarHtml += '<button class="button is-small" onclick="addNavItem(\'sidebar\')">+ Add</button></div>';
        $('#sidebarNavEditor').html(sidebarHtml);
    } catch (error) {
        console.error('Error loading navigation:', error);
    }
}

function addNavItem(section) {
    const label = prompt('लेबल:');
    if (!label) return;
    const link = prompt('लिंक:');
    const icon = prompt('आइकन (fa-xxx):');

    if (!window.navigationData[section]) {
        window.navigationData[section] = [];
    }

    window.navigationData[section].push({
        id: link || label,
        label,
        link,
        icon,
        order: window.navigationData[section].length + 1,
        active: true
    });

    loadNavigation();
}

function removeNavItem(section, index) {
    window.navigationData[section].splice(index, 1);
    loadNavigation();
}

async function saveNavigation() {
    // Collect all input values
    $('input[data-section]').each(function() {
        const section = $(this).data('section');
        const index = $(this).data('index');
        const field = $(this).data('field');
        window.navigationData[section][index][field] = $(this).val();
    });

    try {
        const response = await fetch(`${API_URL}/navigation`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(window.navigationData)
        });

        if (response.ok) {
            alert('नेविगेशन सेव हो गया!');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Users Management
async function loadUsers() {
    try {
        const response = await fetch(`${API_URL}/admin/db/users`, {credentials: 'include'});
        const data = await response.json();

        let html = '';
        (data.users || []).forEach(user => {
            html += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td><span class="tag ${user.role === 'admin' ? 'is-danger' : 'is-info'}">${user.role}</span></td>
                    <td>
                        <button class="button is-small is-info" onclick="editUser(${user.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        $('#usersTableBody').html(html);
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// Database Browser
async function loadCollection() {
    const collection = $('#dbCollection').val();
    if (!collection) return;

    try {
        const response = await fetch(`${API_URL}/admin/db/${collection}`, {credentials: 'include'});
        const data = await response.json();

        $('#dbData').val(JSON.stringify(data, null, 2));
    } catch (error) {
        alert('Error loading collection: ' + error.message);
    }
}

async function saveCollection() {
    const collection = $('#dbCollection').val();
    if (!collection) {
        alert('कृपया कलेक्शन चुनें');
        return;
    }

    try {
        const data = JSON.parse($('#dbData').val());

        const response = await fetch(`${API_URL}/admin/db/${collection}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('डेटाबेस सेव हो गया!');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Logout
async function logout() {
    try {
        await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
    } catch (error) {
        console.error('Logout error:', error);
    }

    localStorage.removeItem('user');
    window.location.href = 'login.html';
}
