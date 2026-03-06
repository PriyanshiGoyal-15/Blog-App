# MyApp - Modern Blog Platform

A sleek, high-perfomance blog application built with Next.js 15, focusing on visual excellence and developer experience.

## ✨ Features

- **Global Auth Context**: Seamless, reactive user state management across the entire application without page refreshes.
- **Dynamic 3D Hero Section**: Immersive landing experience built with Three.js (React Three Fiber) and performance-optimized particles.
- **Full-Stack Blog Management**:
  - Full CRUD operations for blogs.
  - Image banner support.
  - Author attribution and filtering.
- **Admin Dashboard**: Specialized interface for managing users and content with visual data representation (graphs).
- **Responsive Design**: Premium dark-mode aesthetics using Tailwind CSS, optimized for all screen sizes.
- **Performance Optimized**:
  - Mongoose connection pooling for reduced API latency.
  - Deferred JWT secret evaluation for robust build processes.
  - Optimized WebGL rendering settings.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS.
- **Visuals**: Three.js, React Three Fiber, Drei (for 3D scenes).
- **Backend**: Next.js API Routes.
- **Database**: MongoDB with Mongoose ODM.
- **Authentication**: JWT (JSON Web Tokens) with secure cookie storage.
- **Deployment**: Optimized for Vercel with GitHub Actions CI/CD integration.

## 📂 Project Structure

```bash
├── app/
│   ├── (admin)/        # Admin-protected routes & dashboard
│   ├── (auth)/         # Authentication (Login/Register)
│   ├── (user)/         # User-facing blog management
│   ├── api/            # Backend API endpoints
│   └── models/         # Mongoose User and Blog schemas
├── components/         # Reusable UI & 3D components
├── context/            # React AuthContext for global state
├── lib/                # Shared utilities, DB connection, & Auth helpers
└── public/             # Static assets
```

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20+
- MongoDB instance (Local or Atlas)

### 2. Environment Variables
Create a `.env.local` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### 3. Installation

```bash
npm install
```

### 4. Running Locally

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## 🔒 Route Protection

The application uses `middleware.ts` to enforce route access:
- **Public**: `/`, `/login`, `/register`.
- **User Protected**: `/blogs`, `/my-blogs`, `/create`, `/edit/:id`.
- **Admin Protected**: `/dashboard`.

## 📈 Performance Notes

- **DB Pooling**: We use a cached connection strategy in `lib/db.ts` to prevent "Too many connections" errors in serverless environments.
- **Scene LOD**: The Hero Scene particle count and antialiasing are tuned for a balance between visual fidelity and high FPS.

---
*Created with ❤️ by Priyanshi Goyal*
