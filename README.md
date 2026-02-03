# 🔐 Email Authentication API

REST API for user authentication with email verification and password recovery functionality.

## ✨ Features

- 📧 **Email Verification Registration** - Users must verify their email before accessing the platform
- 🔑 **Secure Login** - JWT authentication with verified email validation
- 🔒 **Password Recovery** - Complete password reset system via email
- 🛡️ **Protected Routes** - Full user CRUD operations with authentication middleware
- 📱 **RESTful API** - Well-structured and documented endpoints

## 🚀 Tech Stack

- Node.js + Express
- Sequelize ORM + PostgreSQL
- JWT for authentication
- Bcrypt for encryption
- Nodemailer for email sending
- Helmet for security

## 📋 Endpoints

### Public Routes
- `POST /users` - User registration
- `GET /users/verify/:code` - Email verification
- `POST /users/login` - User login
- `POST /users/reset_password` - Request password reset
- `POST /users/reset_password/:code` - Confirm new password

### Protected Routes (require JWT)
- `GET /users/me` - Get authenticated user profile
- `GET /users` - List all users
- `GET /users/:id` - Get specific user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment variables
4. Run development server: `npm run dev`
5. Server runs on `http://localhost:4000`

## 📦 Installation

```bash
git clone https://github.com/your-username/email-auth-api.git
cd email-auth-api
npm install
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=4000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
DB_HOST=localhost
DB_NAME=your_database
DB_USER=your_username
DB_PASSWORD=your_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## 🔧 Usage

### User Registration
```javascript
POST /users
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "country": "US",
  "frontBaseUrl": "http://yourfrontend.com/verify"
}
```

### Login
```javascript
POST /users/login
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Password Reset
```javascript
POST /users/reset_password
{
  "email": "john@example.com",
  "frontBaseUrl": "http://yourfrontend.com/reset"
}
```

## 📄 License

This project is licensed under the MIT License.