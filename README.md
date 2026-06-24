# Ecommerce Full-Stack Web Application

A fully functional, responsive eCommerce website built with **Next.js**, **Tailwind CSS**, and **MongoDB Atlas**.

This project was developed as part of the Full-Stack Development Internship Task.

---

## ✨ Features

- Fully Responsive design (Desktop + Mobile) matching Figma template
- Dynamic product listing with search functionality
- Product details page
- Shopping Cart with persistence
- User Authentication (Signup & Login)
- Protected Admin Panel with full CRUD operations (Create, Read, Update, Delete)
- Clean and modern UI

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas + Mongoose
- **Authentication**: NextAuth.js

---

## 🚀 Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ecommerce-fullstack-design.git
cd ecommerce-fullstack-design
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root:

```env
MONGO_URI=your_mongodb_atlas_connection_string
NEXTAUTH_SECRET=your_random_long_secret_key
```

### 4. Seed the Database
```bash
npx ts-node scripts/seed.ts
```

### 5. Run the Application
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Admin Access

**Admin Credentials:**

- **Email**: `admin@demo.com`
- **Password**: `admin123`

> Use these credentials to access the Admin Panel at `/admin`.

---

## 📋 Key Pages

- `/` → Home Page (Featured Products)
- `/itemlist` → All Products + Search
- `/item/[id]` → Product Details
- `/cart` → Shopping Cart
- `/admin` → Admin Panel (Protected)

---

## 📅 Milestones Completed

- **Week 1**: Static Frontend (Desktop + Mobile)
- **Week 2**: Backend Integration + Dynamic Content + Cart
- **Week 3**: Authentication + Admin Panel (CRUD) + Final Features

---

## 🚀 Deployment (Vercel Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add `MONGO_URI` and `NEXTAUTH_SECRET` in Environment Variables
4. Deploy

---

**Live Demo**: [Add your Vercel URL here]  
**GitHub**: https://github.com/munazhairfan/ecommerce-fullstack-design

---
