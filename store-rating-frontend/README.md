# 🏪 Rate ur Store

A full-stack web platform where users rate stores, owners track feedback, and admins manage the ecosystem — all in one place.

---

## 🚀 Tech Stack

- **Frontend:** React.js, CSS
- **Backend:** Express.js (Node.js)
- **Database:** SQLite
- **Authentication:** JWT (JSON Web Token)
- **Password Security:** bcrypt.js

---

## 🧩 Project Overview

Rate ur Store enables users to explore stores, give 1–5 star ratings, and modify them anytime.  
It features **role-based access**:

- **System Administrator:** Manages users and stores with full dashboard insights.
- **Store Owner:** Tracks ratings and customer feedback for their stores.
- **Normal User:** Signs up, browses stores, and rates them.

---

## 👥 User Roles & Functionalities

### 🛠 System Administrator
- Add new stores, admin users, and normal users
- Dashboard overview:
  - Total Users
  - Total Stores
  - Total Ratings
- View lists of:
  - Stores → Name, Email, Address, Rating
  - Users → Name, Email, Address, Role
- Apply filters and sorting by Name, Email, Address, Role
- Log out

### 🙋‍♂️ Normal User
- Sign up / Log in
- View all registered stores
- Search by Store Name or Address
- Submit or modify their rating (1–5)
- Update password
- Log out

### 🏠 Store Owner
- Log in
- View ratings submitted for their stores
- Check average store rating
- Update password
- Log out

---

## 🧾 Form Validations

| Field    | Validation                                 |
|----------|--------------------------------------------|
| Name     | 20–60 characters                           |
| Address  | Max 400 characters                         |
| Password | 8–16 characters, 1 uppercase, 1 special char |
| Email    | Standard email format                      |

---

## 🗂️ Folder Structure

```
Rate-ur-Store/
 ├── backend/
 │   ├── src/
 │   │   ├── config/
 │   │   ├── models/
 │   │   ├── routes/
 │   │   ├── controllers/
 │   │   ├── middleware/
 │   │   └── index.js
 │   ├── package.json
 │   ├── .env
 │   └── database.sqlite
 │
 ├── frontend/
 │   ├── src/
 │   │   ├── components/
 │   │   ├── pages/
 │   │   ├── context/
 │   │   └── App.js
 │   ├── package.json
 │   ├── public/
 │   └── .env
 │
 ├── README.md
 ├── .gitignore
 └── package.json
```

---

## ⚙️ Environment Variables

Create a `.env` file inside `backend/`:

```
PORT=5000
JWT_SECRET=your_secret_key
DATABASE_URL=./src/database/database.sqlite
```

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/Rate-ur-Store.git
cd Rate-ur-Store
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

---

## 🧪 Testing the App

- Open two terminals (backend & frontend).
- Visit [http://localhost:3000](http://localhost:3000)
- Login using seeded users:

| Role  | Email                | Password      |
|-------|----------------------|--------------|
| Admin | admin@example.com    | Admin@1234   |
| Owner | owner1@example.com   | Owner@1234   |
| User  | user1@example.com    | User@1234    |

- Try all role functionalities to verify full workflow.

---

## 🔒 Security

- Encrypted passwords using bcrypt.js
- Authenticated endpoints using JWT tokens
- Role-based route protection on both frontend and backend

---

## 🧰 Core NPM Packages

**Backend:**  
`express`, `sqlite3`, `sequelize`, `bcryptjs`, `jsonwebtoken`, `dotenv`, `cors`, `nodemon`

**Frontend:**  
`react`, `react-router-dom`, `axios`, `react-icons`, `react-toastify`

---

## 🧠 Future Enhancements

- Rating analytics dashboard with charts
- Store images and category filters
- Email-based password reset
- Pagination and lazy loading for large store lists
- Deployment to Render / Vercel

---

## 🏁 Conclusion

Rate ur Store simplifies store feedback management for users, owners, and admins alike — designed with clean architecture, strong validations, and intuitive UI/UX.