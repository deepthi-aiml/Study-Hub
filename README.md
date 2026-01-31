# 🎓 Study Hub

**Study Hub** is a premium, intuitive personal study companion designed for students at the University of Moratuwa (ITE 25S1). It helps you track courses, manage custom workloads, and stay ahead of academic deadlines with a state-of-the-art interface.

![Study Hub Banner](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000)

## ✨ Key Features

- **🌓 Dynamic Theme Support**: Switch instantly between light and dark modes with a premium glass-morphism aesthetic that looks stunning in any lighting.
- **📱 Mobile-First Design**: Fully optimized for smartphones and tablets, ensuring your study schedule is always accessible on the go.
- **🔄 Real-Time Progress Sync**: Smart state management ensures your mastery scores and progress bars update instantly across all views.
- **📝 Universal Custom Tasks**: Add your own tasks to any course from the dashboard; they stay perfectly synced with your course detail views.
- **📅 Assessment Date Management**: Set specific dates for exams and summative assignments to activate automatic urgency countdowns and sorting.
- **📊 Academic Mastery Tracking**: Visualizes your learning outcomes across 6 core courses with weighted progress calculations.

## 🚀 Tech Stack

- **Core**: [React 18](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with native CSS variables for theme support
- **Theme Engine**: [next-themes](https://github.com/pacocoursey/next-themes)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest) & Custom LocalStorage Hooks

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd study-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The application will typically be available at `http://localhost:8080` (or the next available port).

## 📂 Project Structure

```
study-hub/
├── src/
│   ├── components/      # Dashboard cards, Theme toggle, Modal views
│   ├── hooks/           # Persistent storage & notification logic
│   ├── pages/           # Main Dashboard and 404 views
│   ├── data/            # Course curriculum and assessment data
│   ├── lib/             # Tailwind & Class merger utilities
│   └── App.tsx          # Theme provider & Routing setup
├── public/              # Static assets
└── vercel.json          # Deployment configuration
```

---

Built with ❤️ for University of Moratuwa Students
