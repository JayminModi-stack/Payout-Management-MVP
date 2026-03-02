# 🚀 Payout Management MVP

A full-stack web application built with:

-   **Frontend:** React (Vite)
-   **Backend:** Express.js
-   **Database:** MongoDB


## ⚙️ Prerequisites

Make sure you have installed:

-   Node.js (v18+ recommended)
-   npm or yarn
-   MongoDB Atlas account (or local MongoDB)

------------------------------------------------------------------------

## 🔧 Environment Variables

Create a `.env` file inside the `backend` folder:

    PORT=5000
    MONGODB_URI=your_mongodb_connection_string

------------------------------------------------------------------------

## 🖥️ Running Locally

### 1️⃣ Start Backend

``` bash
cd backend
npm install
npm run start
```

Backend will run on:

    http://localhost:5000

------------------------------------------------------------------------

### 2️⃣ Start Frontend

Open a new terminal:

``` bash
cd frontend
npm install
npm run start
```

Frontend will run on:

    http://localhost:3000

------------------------------------------------------------------------

## 🔗 API Configuration

Make sure your frontend API base URL is pointing to:

``` js
http://localhost:5000
```

For production, update it to your deployed backend URL.

------------------------------------------------------------------------

## 🌍 Deployment (Vercel)

### Backend

-   Configure serverless function properly
-   Add environment variables in Vercel dashboard
-   Deploy using Vercel CLI or Git integration

### Frontend

    vercel deploy

------------------------------------------------------------------------

## 🛠 Tech Stack

-   React (Vite)
-   Express.js
-   MongoDB
-   Node.js
-   Vercel

------------------------------------------------------------------------

## 📌 Features

-   REST API
-   MongoDB Integration
-   Modular Folder Structure
-   Environment Configuration
-   Production Ready Setup

------------------------------------------------------------------------

## 👨‍💻 Author

**Darshil Modi**\
Full Stack Developer (Magento + Next.js + MERN)

------------------------------------------------------------------------

## 📄 License

This project is licensed under the MIT License.
