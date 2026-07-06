# 🎓 LearnSphere — Online Learning Management System

**LearnSphere Academy** is a modern, full-stack education platform where students can explore courses, track their learning progress, and earn certificates, while teachers can create and manage courses, assignments, and view student ratings.

🔗 **Live Demo:** [learn-sphere-ten.vercel.app](https://learn-sphere-ten.vercel.app)
🔗 **Backend API:** [learnsphere-production-14f7.up.railway.app](https://learnsphere-production-14f7.up.railway.app)

---

## 📋 Overview

| | |
|---|---|
| **Client** | LearnSphere Academy |
| **Type** | Educational Platform (LMS) |
| **Target Users** | Students, Teachers, Parents, Training Institutes, Schools, Universities |
| **Business Goals** | Increase admissions, improve online presence, provide digital learning, showcase professional image |

---

## ✨ Features

### Public Pages
Home · Courses · Course Details · Teachers · Pricing · Events · Blog · FAQ · About · Contact · Login · Register

### Student Dashboard
- Profile management
- My Courses (enrollment & progress tracking)
- Progress overview
- Certificates (auto-issued on course completion)
- Assignments (view & submit)
- Wishlist
- Notifications
- Account settings (edit profile, change password)

### Teacher Dashboard
- Teacher profile
- Course management (create, view, delete)
- Course thumbnail upload (Cloudinary)
- Assignment creation
- Ratings & reviews overview
- Account settings

### Platform Features
- 🔍 Search & filter courses
- 🎓 Auto-generated certificates
- 📱 Fully responsive (mobile hamburger menu, adaptive dashboards)
- 🔐 JWT-based authentication with role-based access (Student / Teacher)
- ⭐ Course ratings & reviews
- 📩 Contact form (saved to database)
- 🎨 Smooth page transitions & micro-animations throughout

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React (icons)

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (authentication)
- Bcrypt.js (password hashing)
- Cloudinary + Multer (image uploads)

**Deployment**
- Frontend → Vercel
- Backend → Railway
- Database → MongoDB Atlas

---

## 📁 Project Structure

```
LearnSphere/
├── backend/
│   ├── config/          # DB & Cloudinary configuration
│   ├── controllers/     # Route logic
│   ├── middleware/       # Upload middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   └── server.js
│
└── frontend/
    └── src/
        ├── assets/        # Images, logo
        ├── components/    # Navbar, Footer, ProtectedRoute
        ├── context/       # Auth & Theme context
        ├── layouts/       # Dashboard layouts (Student/Teacher)
        └── pages/
            ├── dashboard/  # Student dashboard pages
            └── teacher/    # Teacher dashboard pages
```

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)
- Git

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run the backend:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`, with the API running at `http://localhost:5000`.

---

## 🔑 API Endpoints (Summary)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/teachers` | Get all teachers |
| GET | `/api/courses` | Get all courses |
| POST | `/api/courses` | Create a course |
| POST | `/api/courses/upload-image` | Upload course thumbnail |
| POST | `/api/enrollments` | Enroll in a course |
| GET | `/api/enrollments/:studentId` | Get student's enrollments |
| POST | `/api/certificates` | Issue a certificate |
| POST | `/api/wishlist` | Add course to wishlist |
| POST | `/api/ratings` | Submit a course rating |
| POST | `/api/contact` | Submit contact form |

---

## 👩‍💻 Author

**Samar Iqbal**

---

## 📄 License

This project was built as part of a portfolio / academic assignment.
