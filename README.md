# 🧠 Quiz App

A modern, interactive quiz application built with Next.js 15 and React 19, featuring a beautiful UI powered by Radix UI components and Tailwind CSS.

## ✨ Features

- **Interactive Quiz Interface** - Smooth, responsive quiz experience
- **Progress Tracking** - Visual progress indicators using Radix UI Progress component
- **Multiple Choice Questions** - Radio group selections with Radix UI Radio Group
- **Modern UI/UX** - Clean design with Tailwind CSS and custom animations
- **Type Safety** - Full TypeScript implementation
- **Performance Optimized** - Built with Next.js 15 and Turbopack

## 🛠️ Tech Stack

### **Frontend Framework**
- **[Next.js 15.4.4](https://nextjs.org)** - React framework with App Router
- **[React 19.1.0](https://react.dev)** - Latest React with concurrent features
- **[TypeScript 5](https://www.typescriptlang.org)** - Type-safe JavaScript

### **UI & Styling**
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com)** - Unstyled, accessible UI primitives
  - `@radix-ui/react-label` - Accessible form labels
  - `@radix-ui/react-progress` - Progress indicators
  - `@radix-ui/react-radio-group` - Radio button groups
  - `@radix-ui/react-slot` - Flexible component composition
- **[Lucide React](https://lucide.dev)** - Beautiful, customizable icons
- **[tw-animate-css](https://github.com/tw-in-js/tw-animate-css)** - CSS animations for Tailwind

### **Utility Libraries**
- **[clsx](https://github.com/lukeed/clsx)** - Conditional className utility
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind CSS classes
- **[class-variance-authority](https://github.com/joe-bell/cva)** - Component variant utilities

### **Development Tools**
- **[ESLint 9](https://eslint.org)** - Code linting and formatting
- **[Turbopack](https://turbo.build/pack)** - Ultra-fast bundler for development
- **[pnpm](https://pnpm.io)** - Fast, disk space efficient package manager

## 🏗️ Project Structure

```
quizz-app/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── quiz/             # Quiz-specific components
│   └── ui/               # UI component library
├── lib/                  # Utility functions
│   └── utils.ts          # Helper utilities
├── public/               # Static assets
└── package.json          # Project dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quizz-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📜 Available Scripts

```bash
# Development with Turbopack (faster builds)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## 🎨 Design System

### **Component Architecture**
- Built with **shadcn/ui** pattern using [components.json](components.json)
- Radix UI primitives for accessibility
- Tailwind CSS for styling with CSS variables
- Class Variance Authority for component variants

### **Styling Approach**
- **Utility-first** with Tailwind CSS
- **Design tokens** via CSS custom properties
- **Responsive design** with mobile-first approach
- **Dark/light mode** support ready

### **Font System**
- **Geist Sans** - Primary font family
- **Geist Mono** - Monospace font
- Optimized with `next/font` for performance

## 🔧 Development Highlights

### **Modern React Patterns**
- React 19 concurrent features
- App Router for file-based routing
- Server and Client Components separation
- TypeScript for type safety

### **Performance Optimizations**
- **Turbopack** for lightning-fast development builds
- **Next.js Image** optimization
- **Font optimization** with next/font
- **Bundle splitting** and code splitting

### **Developer Experience**
- **Hot reload** with Turbopack
- **TypeScript** for better IDE support
- **ESLint** for code quality
- **Auto-imports** and IntelliSense

## 🌐 Deployment

### **Vercel (Recommended)**
```bash
# Deploy to Vercel
vercel --prod
```

### **Other Platforms**
```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and not licensed for public use.

---

Built with ❤️ using **Next.js 15**, **React 19**, and **Tailwind CSS**
