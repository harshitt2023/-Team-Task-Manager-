# 🚀 Task Manager App 

A full-stack Task Management application built using React, Node.js, Express, and MongoDB.  
It supports authentication, team management, and task assignment features.

---

## ✨ Features

- 🔐 User Authentication (Login / Register)
- 👥 Team Management (Add / View Members)
- 📝 Create, Update, Delete Tasks
- 📅 Task Due Dates & Status Tracking
- 👤 Role-based Access (Admin / Member)
- ⚡ Clean and responsive UI
- 🔔 Toast notifications for actions
- 📱 Fully responsive (Mobile + Desktop)

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt.js

---

## 📁 Project Structure
```
project-root/  
├── client/ (Frontend)  
│   ├── src/  
│   ├── components/  
│   ├── pages/  
│   ├── hooks/  
│   └── App.jsx  
│  
├── server/ (Backend)  
│   ├── models/  
│   ├── routes/  
│   ├── controllers/  
│   ├── middleware/  
│   └── server.js  
```
---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```
### 2️⃣ Install dependencies
- Frontend
- cd client
- npm install
- Backend
- cd server
- npm install
---
### 3️⃣ Setup environment variables
- Backend .env
- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key
- Frontend .env
- VITE_API_URL=http://localhost:5000/api
---
### 4️⃣ Run the project
- Start backend
- cd server
- npm run dev
- Start frontend
- cd client
- npm run dev
---
## 🔐 Authentication Flow
- User logs in / registers
- Server returns JWT token
- Token stored in localStorage
- Axios sends token in headers
- Authorization: Bearer token
---
## 📡 API Endpoints
### 🔐 Auth
| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |

### 📝 Tasks
| Method | Endpoint         |
| ------ | ---------------- |
| GET    | `/api/tasks`     |
| POST   | `/api/tasks`     |
| PUT    | `/api/tasks/:id` |
| DELETE | `/api/tasks/:id` |

### 📁 Projects
| Method | Endpoint        |
| ------ | --------------- |
| GET    | `/api/projects` |
| POST   | `/api/projects` |

---
## 🎯 Future Improvements
- Real-time updates (Socket.io)
- Drag & drop task board
- Email invitations
- File uploads in tasks
- Analytics dashboard
---
### 👨‍💻 Author

- Built with ❤️ by Developer

## 📜 License

- This project is open source and free to use.
