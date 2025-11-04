# 🌍 TourMate — Multi-Organizer Tour Management Platform (Frontend)

TourMate is a full-stack **tour management web platform** that connects **organizers, guides, and tourists** through event creation, cost tracking, participant management, and collaborative trip planning.  
This repository contains the **React + Vite** frontend of the platform.

Live Demo: [https://tour-mate-vite.netlify.app/](https://tour-mate-vite.netlify.app/)  
Backend API: [Django REST Framework + Djoser + JWT Authentication](https://github.com/salahinmushfiq/tour_management_backend)

---

## 🚀 Key Features

### 👥 Authentication & Authorization
- Email/password login & registration via **Djoser + JWT**
- **Google and Facebook OAuth** integration
- Role-based dashboards for **Admin**, **Organizer**, **Guide**, and **Tourist**
- Auto token refresh & session expiry modal

---

## 🧭 Role-Based Dashboards

### 🧑‍💼 **Admin Dashboard**
- View and manage all users (tourists, guides, organizers)
- Approve or restrict organizers and guides
- Monitor global event activity and user statistics
- Access overview charts and system insights

### 🧭 **Organizer Dashboard**
- Create, update, and delete tours/events
- Manage participants and assign guides
- Upload event media and view performance analytics
- Handle bookings and cost tracking

### 🧑‍🏫 **Guide Dashboard**
- Access tours they are assigned to
- View itineraries, participant lists, and event locations
- Update status or event progress in real time
- Communicate updates with organizers

### 🧳 **Tourist Dashboard**
- Browse and filter tours by category and location
- View organizer and guide profiles
- Join or leave tours, view calendar events
- Engage with trip media and feedback

---

## 🗓️ Core Modules

- **Event Management:** create, filter, and view tours  
- **Participant Handling:** organizers manage participants and guides  
- **Media Sharing:** upload photos/videos for event highlights  
- **Calendar View:** see upcoming events, itineraries, and bookings  
- **Admin Insights:** platform-wide analytics and reports  

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend Framework** | React + Vite |
| **State Management** | React Context API |
| **Routing** | React Router DOM (nested + protected routes) |
| **UI Framework** | Tailwind CSS + ShadCN/UI Components |
| **Auth Integration** | Axios Interceptors + JWT Tokens |
| **Animations & Charts** | Framer Motion + Recharts |
| **Deployment** | Netlify (Frontend) + Render (Backend) |

---

## 📂 Directory Structure

src/
├── api/ # Axios instance & API handlers
├── assets/ # Images, icons, and static files
├── components/ # Shared UI components (cards, modals, filters, etc.)
├── context/ # AuthContext and session management
├── layouts/ # Dashboard & landing page layouts for each role
├── pages/ # Route-level pages (Login, Dashboard, etc.)
├── routes/ # Route definitions and role-based guards
└── utils/ # Helper functions and constants

yaml
Copy code

---

## 🔐 Authentication Flow

1. **Login/Register:** via email/password or social OAuth  
2. **JWT Tokens:** stored in `localStorage` and auto-refreshed  
3. **Role Redirect:** users are routed to the correct dashboard (`/dashboard/admin`, `/dashboard/organizer`, `/dashboard/guide`, `/dashboard/tourist`)  
4. **Session Handling:** token expiry tracked via timer & modal warnings  
5. **Logout:** clears tokens and resets session state

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/tourmate-frontend.git
cd tourmate-frontend
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Configure Environment Variables
Create a .env file in the root directory:

bash
Copy code
VITE_API_BASE_URL=https://your-backend-api-url.com/api/
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_FACEBOOK_APP_ID=your_facebook_app_id
4️⃣ Run the Development Server
bash
Copy code
npm run dev
Visit the app at http://localhost:5173

🧩 Deployment
This app is deployed on Netlify and connected to the Django backend hosted on Render.

Continuous deployment from GitHub

.env variables configured in Netlify

Uses Vite build optimization for production

👨‍💻 Developer
Mushfiq Us Salahin
📫 LinkedIn | GitHub

Open for: Remote / Freelance / Full-time Software Engineering roles
🛠️ React | React Native | Django | Flutter | Laravel | MySQL | Firebase

🏆 Acknowledgements
Djoser for backend authentication

Tailwind CSS for rapid UI styling

Render + Netlify for free-tier deployment

“TourMate aims to simplify how travelers connect, collaborate, and explore the world — one tour at a time.”
