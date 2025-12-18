# 🏗️ ELEVATOR (Frontend V2)
### "Rise Above the Noise"

Elevator is a high-luxury, industrial-themed social media frontend built with **React**, **Vite**, and **Zustand**. It features a unique navigation metaphor: users traverse a multi-floor digital shaft to discover curated content across different "Floor Levels".

![Project Aesthetic](https://img.shields.io/badge/Aesthetic-Cyber--Industrial--Luxury-green)
![Tech](https://img.shields.io/badge/Stack-React_18--Tailwind--Framer_Motion-blue)

---

## 🚀 Unique Features

### 🏢 Immersive Elevator Simulation
*   **Modular Display**: A real-time digital nixie-tube style floor indicator.
*   **Interactive Control Panel**: 0-99 floor selection triggering custom door animations and content filtering.
*   **Shaft Transitions**: Smooth door-closing animations (powered by Framer Motion) that mask floor content arrival.
*   **Keyboard HUD**: Direct floor navigation via number keys (0-9) for a pro-user experience.

### 💎 Industrial Design Tokens (UI/UX)
*   **Obsidian Void & Neon Lift**: A custom-coded color palette that balances deep darks with vibrant neon accents.
*   **Glassmorphism**: High-blur background panels for a premium "Cyber" feel.
*   **Micro-interactions**: Custom animations for "Lift" actions (likes), bookmarking, and navigation.

### ⚡ Senior Architecture
*   **State Management**: Scalable store architecture using `Zustand` with `persist` middleware.
*   **Code Splitting**: Optimized bundle size using `React.lazy` and `Suspense` for heavy components (Settings, Profile, Chat).
*   **Responsive Core**: A intelligent 3-column layout that gracefully collapses into a mobile-first interface.
*   **Accessibility (a11y)**: Proper ARIA roles, semantic HTML5, and intentional keyboard focus management.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)

---

## 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/mahmoud-ammar584/elevator.git

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🗺️ Modular Structure

```text
src/
├── components/
│   ├── elevator/       # Modular Simulation Components
│   │   ├── FloorDisplay.tsx
│   │   ├── ElevatorPanel.tsx
│   │   └── DoorSystem.tsx
│   ├── PostCard.tsx    # Cyber-styled social units
│   └── ...
├── store/
│   ├── uiStore.ts      # Global Elevator State
│   └── authStore.ts
└── styles/
    └── index.css       # Brand Identity Tokens
```

---

## 👨‍💻 Author
**Mahmoud Ammar** - *Senior-Level Frontend Vision*

---
*Elevator: Because Social Media should feel like a ride to the top.*
