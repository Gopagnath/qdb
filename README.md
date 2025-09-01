React Dashboard + Blog App

A full-stack React + TypeScript application with a sidebar layout, routing, blog posts, and profile data — powered by a custom Express + TypeScript backend.

Built using:

⚛️ React + Vite + TypeScript

🎨 Ant Design + Styled Components

🔗 React Router v6

🚀 Node.js + Express (TypeScript)

🧪 Vitest + Testing Library

📋 Table of Contents

📦 Prerequisites

📂 Project Structure

🚀 Backend Setup

🌐 Frontend Setup

⚙️ Environment Variables

🧪 Testing

📁 API Endpoints

🔒 Best Practices

📦 Prerequisites

Node.js (v18+)

Yarn (v1.22+)

Git

Modern browser

📂 Project Structure
project-root/
├── backend/            # Node.js + Express server (TypeScript)
└── frontend/           # React app (Vite + TypeScript)

Backend Setup
1. Navigate to backend folder:
cd backend
2. Install dependencies:
yarn install
3. Create .env file:
PORT=3000
4. Start development server:
yarn dev
Server runs at: http://localhost:3000

Frontend Setup
1. Navigate to frontend folder:
cd frontend
2. Install dependencies:
yarn install
3. Create .env file:
VITE_API_BASE_URL=http://localhost:3000
4. Run the app:
yarn dev
Open in browser: http://localhost:5173
Testing
Run unit tests (frontend):
yarn test
Uses:
Vitest
React Testing Library