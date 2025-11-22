🚀 Elevator — Modern Social Media Platform (Frontend Only)

A complete React + Vite social platform UI inspired by Meta, built with clean architecture, scalable components, and production-grade code.

🏆 Overview

Elevator is a full-fledged social media project built with React + TypeScript + Vite + TailwindCSS.

UI like Meta / Instagram

State management optimized

Animations smooth

Reusable components


✨ Key Features

🔐 Authentication UI (Login / Register + Validation)

🏠 Home Feed with posts

📝 Create Post (Text + Images)

❤️ Likes (Optimistic UI)

💬 Comments Modal

🔔 Notifications UI

💬 Real-time Chat UI (mocked)

👤 Profile Page

🔍 Search + Trending

📑 Bookmarks System

🎨 Modern Meta-Style UI

📱 Fully Responsive (Mobile + Desktop)

⚡ Fast — built on Vite

📚 Clean folder structure

🛠️ Editable & Extendable

🧰 Tech Stack
Category	Technologies
Frontend Framework	React + TypeScript
Bundler	Vite
Styling	Tailwind CSS
Icons	Lucide React
State	React Hooks
Animations	CSS + Tailwind Transitions
Deployment	GitHub Pages
📂 Project Structure
elevator-frontend/
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── assets/
│   │   └── images…
│   ├── components/
│   │   ├── Sidebar/
│   │   ├── RightPanel/
│   │   ├── PostCard/
│   │   ├── NewPostModal/
│   │   ├── CommentsModal/
│   │   ├── ChatPanel/
│   │   ├── Navbar/
│   │   └── UI/ (Buttons, Inputs, Loaders…)
│   ├── data/
│   │   └── initialData.ts
│   ├── utils/
│   │   ├── generateId.ts
│   │   └── formatDate.ts
│   ├── styles/
│   │   └── index.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── package.json
├── tsconfig.json
├── tailwind.config.cjs
├── postcss.config.cjs
├── vite.config.ts
└── README.md  ← (هذا الملف)

⚙️ Installation & Run Locally
1️⃣ Clone the repo
git clone https://github.com/your-username/elevator.git

2️⃣ Enter the project folder
cd elevator-frontend

3️⃣ Install dependencies
npm install

4️⃣ Run development server
npm run dev

5️⃣ Open your browser
http://localhost:5173

🚀 Building for Production
npm run build

🌍 Deploy to GitHub Pages
1️⃣ Add this to vite.config.ts:
base: '/your-repo-name/',

2️⃣ Run:
npm run deploy

Done 🎉


جاهز لإضافة Backend (NestJS + Prisma)

جاهز يتحوّل Mobile App بـ React Native

📸 Screenshots


![Elevator Home](./screenshots/home.png)
![Elevator Profile](./screenshots/profile.png)
![Elevator Chat](./screenshots/chat.png)

🧪 Testing (Manual & UI Testing)

Input validation

Edge cases

Navigation flow

Error states

Loading skeletons

Component isolation testing

🛠️ Future Enhancements

Backend كامل (NestJS + PostgreSQL + Prisma)

Real-time Chat (Socket.io)

Push Notifications

Image Upload (S3)

AI recommendations

Video posts + Reels

Stories

👨‍💻 Author

Mahmoud Ammar
Frontend / Fullstack Engineer
Egypt 🇪🇬
Email: mahmoudammar584@gmail.com

GitHub: https://github.com/mahmoud-ammar584

❤️ Contributions

Pull requests are welcome!
You can easily add any Feature or fix a Bug.

🎉 Enjoy Building with Elevator!

