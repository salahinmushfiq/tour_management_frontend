# 🌍 TourMate — Multi-Organizer Tour Management Platform (Frontend)

TourMate is a full-stack **tour management web platform** that connects **organizers and tourists** through event creation, cost tracking, and collaborative trip planning.  
This repository contains the **React + Vite** frontend of the platform.

Live Demo: [https://tour-mate-vite.netlify.app/](https://tour-mate-vite.netlify.app/)  
Backend API: [Django REST Framework + Djoser + JWT Authentication](https://github.com/salahinmushfiq/tour_management_backend) *(private/public link if applicable)*

---

## 🚀 Key Features

### 👥 Authentication & Authorization
- Email/password login & registration via **Djoser + JWT**
- **Google and Facebook OAuth** integration
- Role-based routing for **Tourists** and **Organizers**
- Auto token refresh & session expiry modal

### 🧭 User Experience
- Clean, responsive design built with **Tailwind CSS**
- Separate dashboards:
  - **Organizer Dashboard:** manage tours, participants, and event media
  - **Tourist Dashboard:** browse events, view organizers, and book tours
- Landing page and dynamic route-based layouts

### 🗓️ Core Modules
- **Event Management:** create, filter, and view tour events  
- **Participant Handling:** organizer can track and manage participants  
- **Media Sharing:** photo/video uploads for event highlights  
- **Calendar View:** view tour timelines and upcoming events

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
├── layouts/ # Dashboard & landing page layouts
├── pages/ # Route-level pages (Login, Dashboard, etc.)
├── routes/ # Route definitions and role-based guards
└── utils/ # Helper functions and constants

yaml
Copy code

---

## 🔐 Authentication Flow

1. **Login/Register:** via email/password or social OAuth  
2. **JWT Tokens:** stored in `localStorage` and auto-refreshed  
3. **Role Redirect:** users are routed to the correct dashboard  
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

Continuous Deployment from GitHub

.env variables configured in Netlify

Uses Vite build optimization for production

👨‍💻 Developer
Mushfiq Us Salahin
📫 LinkedIn | GitHub

Open for: Remote / Freelance / Full-time Software Engineering roles
React | React Native | Django | Flutter | Laravel | MySQL | Firebase

🏆 Acknowledgements
Djoser for backend authentication

Tailwind CSS for rapid UI styling

Render + Netlify for free-tier deployment

“TourMate aims to simplify how travelers connect, collaborate, and explore the world — one tour at a time.”

vbnet
Copy code

Would you like me to tailor this further for **GitHub profile optimization** (e.g., badges, screenshots, and live demo thumbnails)?  
That version looks great to recruiters browsing your repo.
