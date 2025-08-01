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
- **ORM:** Prisma
- **Others:** CORS, dotenv

---

## 🚀 Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/Belal-Bari/04_File_Uploader-Backend_Project-.git
   cd 04_File_Uploader-Backend_Project-

2. Install dependencies
    ```bash
    npm install
  
3. Set environment variables
    ```bash
    PORT=3000
    DB_URI=your_database_connection_string
    JWT_SECRET=your_jwt_secret
4. Run the server
     ```bash
     npm start

## Authentication & Authorization

- JWT tokens are generated at login.
- Tokens must be sent in the Authorization header (Bearer <token>).
- Middleware restricts access based on user roles (admin, public).

## Frontend Usage
- Admin Frontend uses admin token to access secure routes.
- Public Frontend can:
  - Read published content
  - Submit comments
  - Cannot access admin routes

## Screenshots
Frontend_Admin:
![Capture](https://github.com/Belal-Bari/05_Blog_API/blob/03aa6713c66f34d9403322ad816a5b32d9cc416e/Frontend_Admin/Capture.JPG)
![Capture_2](https://github.com/Belal-Bari/05_Blog_API/blob/03aa6713c66f34d9403322ad816a5b32d9cc416e/Frontend_Admin/Capture_2.JPG)
![Capture_3](https://github.com/Belal-Bari/05_Blog_API/blob/03aa6713c66f34d9403322ad816a5b32d9cc416e/Frontend_Admin/Capture_3.JPG)
![Capture_4](https://github.com/Belal-Bari/05_Blog_API/blob/03aa6713c66f34d9403322ad816a5b32d9cc416e/Frontend_Admin/Capture_4.JPG)
![Capture_5](https://github.com/Belal-Bari/05_Blog_API/blob/03aa6713c66f34d9403322ad816a5b32d9cc416e/Frontend_Admin/Capture_5.JPG)

Frontend_Public:
![Capture_1](https://github.com/Belal-Bari/05_Blog_API/blob/03aa6713c66f34d9403322ad816a5b32d9cc416e/Frontend_Public/Capture_1.JPG)
![Capture_2](https://github.com/Belal-Bari/05_Blog_API/blob/03aa6713c66f34d9403322ad816a5b32d9cc416e/Frontend_Public/Capture_2.JPG)
![Capture_3](https://github.com/Belal-Bari/05_Blog_API/blob/03aa6713c66f34d9403322ad816a5b32d9cc416e/Frontend_Public/Capture_3.JPG)

## License
MIT License. Feel free to use and modify!

## Contact
Created by Belal Bari - feel free to reach out!</br>
Email: tanvirj9@gmail.com</br>
GitHub: Belal-Bari
