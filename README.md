# Schedule Maker 🗓️

A full-stack schedule management application built with the **MERN stack** (MongoDB, Express, React, Node.js). This app allows users to register, log in, and manage their schedules through an interactive calendar UI.

## Features

### ✅ Authentication
- Register and login functionality
- JWT-based authentication
- Protected frontend routes

### 🗓️ Schedule Management
- Add, edit, and delete schedules
- View schedules in a calendar format
- Backend APIs for schedule CRUD operations

### 🌐 Tech Stack

#### Backend
- **Node.js** & **Express** — RESTful API
- **MongoDB** & **Mongoose** — NoSQL database
- **JWT** — Authentication
- **dotenv** — Environment variable management

#### Frontend
- **React** — Component-based UI
- **Vite** — Fast build tool
- **Tailwind CSS** — Utility-first styling
- **Axios** — HTTP requests
- **React Router** — Client-side routing
- **Context API** — Global auth state

---

## Getting Started

### 🛠 Prerequisites

- Node.js
- MongoDB
- Git

---

## 🚀 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/musaddiq-ashfaq/schedule-maker.git
cd schedule-maker
```

### 2. Setup the backend
```bash
cd backend
npm install
```

### 3. Create a .env file 
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Run the backend server
```bash
npm run dev
```

### 5. Setup the frontend
```bash
cd ../frontend
npm install
```
### 6. Run frontend
```bash
npm run dev
```
