Hero.IO – Productive App Showcase
📋 Description

Hero.IO is a modern, responsive React web application built to showcase and manage productive mobile apps.
It allows users to explore trending apps, view detailed app information, and install/uninstall apps using browser localStorage.
The project follows a clean Figma-inspired layout with proper routing, toasts, charts, and responsive design.

🚀 Key Features

🏠 Home Page — Hero banner, download stats, trending apps grid

🔍 Apps Page — Live search and filtering for apps (case-insensitive)

📱 App Details Page — Full app information, install button, rating chart using Recharts

💾 LocalStorage Integration — Keeps track of installed apps

⚙️ Installation Page — View and uninstall installed apps with live toast notifications

⚠️ Custom 404 Error Page — For invalid routes or missing apps

🔗 External Links — GitHub contribution button, App Store & Play Store redirects

📱 Mobile Responsive — TailwindCSS layout optimized for all devices

🧰 Technologies Used

Category	Technologies
Frontend Framework	React 18
Routing	React Router DOM
Styling	Tailwind CSS
Charts	Recharts
State Management	React Hooks (useState, useEffect, useMemo)
Storage	Browser LocalStorage
Deployment	Netlify
Icons & Assets	Custom PNG/SVG stored under /public/assets


📂 Project Structure
hero-app/
│
├── public/
│   ├── assets/           # Icons, images (logo, hero, store buttons)
│   ├── data/
│   │   └── trending.json # JSON data for app listing
│
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Apps.jsx
│   │   ├── AppDetails.jsx
│   │   ├── Installation.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── main.jsx
│
├── tailwind.config.js
├── package.json
└── README.md


🧠 How to Run Locally

# 1. Clone the repository
git clone https://github.com/your-username/hero.io.git
cd hero.io

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
http://localhost:5173

🛠️ Future Enhancements

Add Dark/Light mode

Add Pagination and Sorting in Apps Page

Integrate Firebase backend for real-time data

Add PWA (Progressive Web App) support for offline installs

💡 Author & Credits

Developed by Ovijit Kumar Dey (Hero.IO Team)
🔗 GitHub Profile :https://github.com/ovijit96

💬 “Turning your ideas into productive apps that make an impact.”