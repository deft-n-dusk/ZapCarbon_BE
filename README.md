# ⚡ ZapCarbon Backend (API)

ZapCarbon Backend is a **Node.js + Express API** that powers the [ZapCarbon App](https://zap-carbon-ui.vercel.app/) – a carbon footprint tracker that helps users log activities, calculate CO₂ emissions, and retrieve analytics data.

This backend handles **authentication, activity logging, summary generation, and history tracking**, and connects with **MongoDB Atlas** as the database.

---

## ✨ Features

- **JWT-based Authentication (with Cookies)**  
  - Signup/Login system with secure token handling.
  
- **Activity Logging (15 categories)**  
  - Records user activities like travel, energy use, meat consumption, LPG, etc.  
  - Calculates **CO₂ emissions** based on official emission factors.

- **Summary API**  
  - Returns **total emissions**, **emissions by type (Pie Chart)**, and **emissions over time (Line Chart)**.

- **History API**  
  - Returns all logged activities with date, activity type, input amount, and calculated emissions.

- **Modular & Scalable Structure**  
  - Clean separation of `routes`, `models`, `middlewares`, and `utils`.

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js** – Server & Routing  
- **MongoDB Atlas** – Cloud Database (Mongoose ODM)  
- **JWT (JSON Web Token)** – Authentication  
- **Middleware-based Validation** – For secure requests  
- **Deployed on Render** – Production-ready

---

## 📂 Project Structure

ZapCarbon_BE/
│
├── src/
│ ├── config/
│ │ └── database.js # MongoDB connection
│ ├── middlewares/
│ │ └── auth.js # JWT validation middleware
│ ├── models/
│ │ ├── activity.js # Activity schema
│ │ └── user.js # User schema
│ ├── routes/
│ │ ├── activityRouter.js # Routes for logging/viewing activities
│ │ ├── authCheckRouter.js # Route to verify authentication
│ │ ├── authRouter.js # Login/Signup routes
│ │ └── summaryRouter.js # Summary & analytics routes
│ ├── utils/
│ │ ├── activityMetaData.js # Metadata for activity types
│ │ ├── emissionFactors.js # Official Indian (CEA) emission factors
│ │ └── validation.js # Input validation logic
│ └── app.js # Express app entry point
│
├── .env # Environment variables
├── package.json
└── package-lock.json

---

## ⚙️ Installation & Setup

### 1. Clone the Backend
```bash
git clone https://github.com/deft-n-dusk/ZapCarbon_BE.git

# Install backend dependencies
npm install

# Start backend server
npm run dev
