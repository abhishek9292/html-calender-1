# भारत कैलेंडर - Full Stack System Guide 🚀

Complete Hindi Calendar Application with Backend, Admin Panel, E-commerce, and User Management

---

## 📋 **System Overview**

### **Frontend**
- 11 HTML pages with Hindi calendar features
- Shopping page with cart functionality
- User authentication (login/register)
- Admin dashboard for management
- Responsive mobile-first design

### **Backend**
- Python Flask REST API
- JSON file-based database
- Session-based authentication
- CRUD operations for all resources
- CORS enabled for frontend

### **Features**
✅ User Authentication & Authorization
✅ Admin Panel with Full Management
✅ E-commerce with Shopping Cart
✅ Cash on Delivery & Card Payment
✅ Page Management System
✅ Product Management
✅ Order Management
✅ Navigation Management
✅ Database Browser
✅ Calendar Data APIs

---

## 🗂️ **Project Structure**

```
hindi-calender/
├── src/                          # Frontend Application
│   ├── index.html                # Home page
│   ├── login.html                # Login page
│   ├── admin.html                # Admin dashboard
│   ├── shop.html                 # Shopping page
│   ├── checkout.html             # Checkout page
│   ├── calendar.html             # Calendar page
│   ├── [other pages...]
│   │
│   ├── css/
│   │   └── styles.css            # Main styles
│   │
│   └── js/
│       ├── routes.js             # Navigation
│       ├── admin.js              # Admin panel logic
│       ├── shop.js               # Shopping cart logic
│       ├── checkout.js           # Checkout logic
│       ├── home.js               # Home page logic
│       └── calendar-data.js      # Calendar data
│
├── backend/                      # Backend Application
│   ├── app_full.py               # Full Stack Flask Server
│   ├── requirements.txt          # Python dependencies
│   │
│   └── db/                       # JSON Database
│       ├── users.json            # User accounts
│       ├── pages.json            # Page management
│       ├── products.json         # Products catalog
│       ├── orders.json           # Orders
│       └── navigation.json       # Navigation data
│
├── FULLSTACK_GUIDE.md            # This file
└── README.md                     # Project documentation
```

---

## 🚀 **Quick Start**

### **1. Setup Backend**

```bash
# Navigate to backend folder
cd backend

# Install dependencies
pip install -r requirements.txt

# Run the full stack server
python app_full.py
```

Server will start at: **http://localhost:5090**

### **2. Access Application**

Open your browser and go to:
- **Frontend**: http://localhost:5090
- **Login Page**: http://localhost:5090/login.html
- **Admin Panel**: http://localhost:5090/admin.html
- **Shop**: http://localhost:5090/shop.html

### **3. Default Credentials**

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Demo User:**
- Username: `demo`
- Password: `demo123`

---

## 📡 **API Endpoints**

### **Authentication APIs**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/me` | Get current user |

### **Page Management APIs**

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/pages` | Get all pages | Public |
| GET | `/api/pages/<id>` | Get specific page | Public |
| POST | `/api/pages` | Create new page | Admin |
| PUT | `/api/pages/<id>` | Update page | Admin |
| DELETE | `/api/pages/<id>` | Delete page | Admin |

### **Product Management APIs**

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Get all products | Public |
| GET | `/api/products/<id>` | Get specific product | Public |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/<id>` | Update product | Admin |
| DELETE | `/api/products/<id>` | Delete product | Admin |

### **Order Management APIs**

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/orders` | Create order | User |
| GET | `/api/orders` | Get orders | User |
| PUT | `/api/orders/<id>` | Update order status | Admin |

### **Navigation APIs**

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/navigation` | Get navigation | Public |
| PUT | `/api/navigation` | Update navigation | Admin |

### **Database Browser APIs**

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/db/<collection>` | View database | Admin |
| PUT | `/api/admin/db/<collection>` | Update database | Admin |

### **Calendar Data APIs**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/panchang/<date>` | Get panchang data |
| GET | `/api/calendar/<year>/<month>` | Get month calendar |
| GET | `/api/festivals/<year>/<month>` | Get festivals |
| GET | `/api/muhurat/<year>/<month>` | Get muhurat |
| GET | `/api/rashifal/<date>` | Get horoscope |
| GET | `/api/vrat/<year>/<month>` | Get vrat days |
| GET | `/api/today` | Get today's complete data |

---

## 🛠️ **Admin Panel Features**

### **Dashboard**
- Total users count
- Total products count
- Total orders count
- Total pages count

### **Page Management**
- Create new pages
- Edit existing pages
- Delete pages
- Manage page sections
- Toggle active/inactive status

### **Product Management**
- Add new products
- Edit product details
- Delete products
- Manage stock
- Set prices
- Toggle active/inactive

### **Order Management**
- View all orders
- Update order status
- Track deliveries
- View customer details

### **Navigation Management**
- Edit main navigation
- Edit sidebar navigation
- Add/remove menu items
- Reorder items

### **User Management**
- View all users
- Edit user roles
- Manage permissions

### **Database Browser**
- View raw JSON data
- Edit database directly
- Backup/restore data

---

## 🛒 **E-commerce Features**

### **Shopping Page**
- Product catalog with images
- Add to cart functionality
- Buy now option
- Cart sidebar with items
- Quantity management
- Remove items
- Real-time total calculation

### **Cart Features**
- Persistent cart (localStorage)
- Quantity increase/decrease
- Item removal
- Total price calculation
- Empty cart handling

### **Checkout Process**
1. View order summary
2. Enter shipping address
3. Select payment method:
   - Cash on Delivery (COD)
   - Credit/Debit Card
   - UPI Payment
4. Place order
5. Receive order confirmation

### **Payment Methods**

**Cash on Delivery (COD)**
- Pay when order arrives
- No online payment needed

**Card Payment**
- Enter card details
- Secure payment
- (Integration ready for payment gateway)

**UPI Payment**
- Google Pay, PhonePe, Paytm
- Enter UPI ID
- (Integration ready for UPI gateway)

---

## 👤 **User Authentication**

### **Login System**
- Username/password authentication
- Session-based login
- Remember me option
- Role-based access (admin/user)
- Auto-redirect based on role

### **User Roles**

**Admin:**
- Full access to admin panel
- Manage all resources
- View database
- Manage users

**User:**
- Browse products
- Place orders
- View own orders
- Update profile

---

## 💾 **Database Structure**

### **users.json**
```json
{
  "users": [
    {
      "id": 1,
      "username": "admin",
      "password": "admin123",
      "email": "admin@bharatcalendar.com",
      "role": "admin",
      "created": "2025-01-15T10:00:00Z"
    }
  ]
}
```

### **products.json**
```json
{
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "description": "Description",
      "price": 299,
      "image": "/images/product.jpg",
      "category": "category",
      "stock": 100,
      "active": true,
      "created": "2025-01-15T10:00:00Z"
    }
  ]
}
```

### **orders.json**
```json
{
  "orders": [
    {
      "id": "uuid",
      "user_id": 1,
      "items": [],
      "total": 599,
      "payment_method": "cod",
      "status": "pending",
      "shipping_address": {},
      "created": "2025-01-15T10:00:00Z"
    }
  ]
}
```

---

## 🔐 **Security Features**

- Session-based authentication
- Role-based authorization
- Admin-only routes protection
- User-specific data access
- CORS enabled for frontend
- Password validation (basic)
- Input sanitization

**⚠️ Production Notes:**
- Use proper password hashing (bcrypt)
- Use environment variables for secrets
- Implement CSRF protection
- Add rate limiting
- Use HTTPS
- Implement JWT tokens

---

## 🎨 **Frontend Pages**

### **Public Pages**
- `index.html` - Home page with calendar
- `calendar.html` - Full calendar view
- `shop.html` - Products catalog
- `music.html` - Aarti/Bhajan
- `tyohaar.html` - Festivals
- `kundali.html` - Horoscope
- `login.html` - User login

### **Protected Pages**
- `checkout.html` - Order checkout (requires login)
- `ayojan.html` - Events management (requires login)

### **Admin Pages**
- `admin.html` - Admin dashboard (requires admin role)

---

## 📱 **Mobile Features**

- Responsive design (375px optimized)
- Touch-optimized controls
- Bottom navigation
- Swipe gestures for calendar
- Mobile-friendly forms
- Cart sidebar for mobile

---

## 🔧 **Development**

### **Adding New Product**
```javascript
// Via Admin Panel UI or API
POST /api/products
{
  "name": "New Product",
  "price": 499,
  "description": "Description",
  "stock": 50,
  "category": "religious",
  "active": true
}
```

### **Adding New Page**
```javascript
// Via Admin Panel UI or API
POST /api/pages
{
  "title": "New Page",
  "slug": "new-page",
  "sections": [],
  "active": true
}
```

### **Managing Orders**
```javascript
// Update order status
PUT /api/orders/<order-id>
{
  "status": "shipped"  // pending/confirmed/shipped/delivered/cancelled
}
```

---

## 📊 **Order Status Flow**

```
pending → confirmed → shipped → delivered
            ↓
         cancelled
```

---

## 🚧 **Future Enhancements**

- [ ] Email notifications
- [ ] SMS alerts
- [ ] Payment gateway integration (Razorpay/PayU)
- [ ] Image upload for products
- [ ] Product reviews & ratings
- [ ] Wishlist functionality
- [ ] Order tracking
- [ ] Invoice generation
- [ ] Advanced search & filters
- [ ] Promotional codes/coupons
- [ ] Multi-language support
- [ ] PWA support
- [ ] Push notifications

---

## 📞 **Support**

For questions or issues:
1. Check API documentation above
2. Review database structure
3. Check browser console for errors
4. Verify backend is running

---

## ✅ **Testing Workflow**

### **1. Test Authentication**
```bash
# Login as admin
Username: admin
Password: admin123

# Should redirect to admin.html
```

### **2. Test Shopping**
```bash
# Go to shop.html
# Add products to cart
# Go to checkout
# Fill shipping details
# Select COD
# Place order
# Verify order in admin panel
```

### **3. Test Admin Panel**
```bash
# Login as admin
# Go to admin.html
# Test each management section:
  - Dashboard stats
  - Page management (add/edit/delete)
  - Product management (add/edit/delete)
  - Order management (view/update status)
  - Navigation management (edit/save)
  - Database browser (view/edit)
```

---

## 📝 **Notes**

- Default port: **5090**
- Database: JSON files in `backend/db/`
- Sessions: In-memory (restart clears sessions)
- Cart: localStorage (persistent across sessions)
- Images: Placeholder icons (add real images later)

---

**Made with ❤️ for भारत कैलेंडर**

🗓️ Complete Hindi Calendar with E-commerce & Admin Panel

**Version**: 3.0 (Full Stack)

**Last Updated**: January 2025

**Language**: हिंदी (Hindi) Primary
