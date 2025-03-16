#  Job Search Portal

## 📌 Overview
The **Job Search Portal** is a web application designed to help users search,save and apply for jobs seamlessly. Built using the **MERN stack** (MongoDB, Express.js, React, Node.js), the platform offers job listings, bookmarking, real-time notifications.

## 🚀 Features
- **User Authentication** (Sign up, Login, Logout)
- **Job Listings** with filters (title, location, category, etc.)
- **Pagination for efficient job browsing**
- **Job Application System** (Apply for jobs)
- **Job Bookmarking** (Save & unsave jobs)
- **Real-time Notifications** (Application status updates)
- **Redux Toolkit** for state management
- **Responsive UI** built with **Tailwind CSS** and **Framer Motion** for animations

## 🛠 Tech Stack
- **Frontend:** React, Redux Toolkit, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js, MongoDB
- **State Management:** Redux Toolkit
- **Authentication:** JWT-based authentication

## 📂 Project Structure
```
MERN-Job-Search-Portal/
├── backend/
│   ├── connectdb/
│   ├── controller/
│   │   ├── authController.js
│   │   ├── dashboardController.js
|   |   |__jobActionController.js
|   |   |__jobController.js
│   ├── middleware/
|   |
│   ├── models/
│   │   ├── jobmodel.js
│   │   ├── jobApplication.js
│   │   ├── userModel.js
│   ├── Routes/
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── jobActionRoutes.js
│   │   ├── jobRoutes.js
│   ├── server.js
│
├── front-end/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Home.jsx
│   │   │   ├── Jobs.jsx
│   │   ├── redux/
│   │   ├── App.jsx
│   │   ├── index.js
│
```

## 🏗 Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/MERN-Job-Search-Portal.git
cd MERN-Job-Search-Portal
```

### **2️⃣ Backend Setup**
```sh
cd backend
npm install
npm start
```

### **3️⃣ Frontend Setup**
```sh
cd ../front-end
npm install
npm run dev
```

### **4️⃣ Environment Variables**
Create a `.env` file in the **backend** folder with the following variables:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

## 📌 API Endpoints
### **Job Actions**
- `GET /api/job-actions/saved` → Returns an array of saved jobs
- `GET /api/job-actions/applied` → Returns an array of applied jobs
- `POST /api/job-actions/save/:jobId` → Saves or unsaves a job
- `POST /api/job-actions/apply/:jobId` → Applies for a job

## 👥 Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

## 📜 License
This project is licensed under the MIT License.

---

🎯 Happy Coding!

