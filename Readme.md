# Dual Frontend Backend API

This project implements a RESTful backend using **Node.js** and **Express**, designed to serve **two separate frontend applications**:

- **Admin Frontend** – For authorized administrators to manage content.
- **Public Frontend** – For general users to view content and interact with limited features.

- **Backend_API** - The backend supports JWT-based authentication, role-based access control, and CRUD operations for posts and comments.

---

## ✨ Features

- Separate access control for Admin and Public users
- JSON Web Token (JWT) authentication
- Role-based middleware to protect admin routes
- RESTful API endpoints for posts and comments
- CORS setup for multiple frontend clients
- Environment-based configuration

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** React.js (vite)
- **Authentication:** JWT
- **Database:** PostgreSQL
- **Others:** CORS, dotenv

---

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name