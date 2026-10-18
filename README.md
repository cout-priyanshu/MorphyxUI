<div align="center">

# MorphyxUI

**Architectural Brutalist React Component Engine & Neural Interface Studio**

[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=black)](LICENSE)
[![NPM Version](https://img.shields.io/badge/NPM-morphyx--ui-black.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/morphyx-ui)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-black.svg?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4+-black.svg?style=for-the-badge&logo=tailwindcss&logoColor=38B2AC)](https://tailwindcss.com/)
[![Node Version](https://img.shields.io/badge/Node.js-18+-black.svg?style=for-the-badge&logo=node.js&logoColor=339933)](https://nodejs.org/)



https://github.com/user-attachments/assets/7c0b7395-37aa-426e-9c79-e76d6270797c



<p align="center">
  A high-contrast, zero-runtime React component library and AI-driven UI synthesizer built for modern engineering teams who demand clean Tailwind CSS markup, deterministic geometry, and zero wrapper bloat.
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#system-architecture">Architecture</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#api-reference">API Reference</a> •
  <a href="#contributing">Contributing</a>
</p>

---

</div>

## Overview

Modern web applications are increasingly burdened by runtime-injected CSS-in-JS stylesheets, redundant wrapper divs, and generic component presets. **MorphyxUI** rethinks frontend interface composition by delivering:

- **Zero-Runtime Overhead:** Every UI block compiles down to accessible, semantic React markup powered solely by native Tailwind CSS utility classes.
- **Strict Geometric Brutalism:** Completely free of rounded corners (`rounded-none`). Crisp $1\text{px}$ wireframe borders, monospace telemetry, and high-contrast monochrome surfaces designed for technical dashboards and developer tools.
- **Neural Synthesis Pipeline:** Natural language and Hinglish prompting transforms user intent into fully functional React JSX with real-time prop binding, sandbox previews, and one-click publishing to the npm registry.

---

## Key Features

### 1. Neural Component Studio (`/generate`)
- Natural language to JSX parsing with integrated credit deduction telemetry.
- Real-time client-side live code sandbox powered by `react-live` with automated import stripping and root component resolution.
- Responsive multi-device canvas simulation.




- One-click copy for clean JSX source or direct persistence to user workspace.

### 2. Private Workspace & Registry Explorer (`/my-components` & `/components`)
- Segregated public directory and authenticated private workspaces.
- Isolated preview tabs with interactive viewport resizing, raw code review, and $3$-step drop-in integration blueprints.
- Instant search filtering by component identifiers and prop keys.

### 3. Automated Packaging Engine (Admin Control)
- Headless packaging automation that mounts components into a standalone library directory, compiles via dynamic build scripts, bumps patch versions, and deploys directly to the public npm registry.

### 4. Credit & Payment Subsystem (`/pricing`)
- Secure compute token acquisition powered by Razorpay.
- Cryptographic HMAC-SHA256 signature verification preventing payment forgery.
- Instant automated credit assignment post-transaction.

### 5. Architectural Design System
- Micro-interactions powered by GSAP and Framer Motion.
- Inverting custom circular magnetic cursor utilizing `mix-blend-mode: difference`.
- Mobile-first dual-tier navigation drawers and accessible focus rings.

---

## Tech Stack

| Domain | Technologies / Libraries |
| :--- | :--- |
| **Frontend Core** | React 18/19, Vite, React Router DOM (v6) |
| **State Management** | Redux Toolkit (`@reduxjs/toolkit`, `react-redux`) |
| **Styling & System** | Tailwind CSS, PostCSS, Autoprefixer |
| **Animations** | GSAP (with ScrollTrigger), Framer Motion |
| **Code Sandbox** | `react-live` (dynamic in-browser Babel transpile & render) |
| **Icons & Typography** | `react-icons` (Tabler, Feather, Heroicons), Syne, DM Sans, JetBrains Mono |
| **Backend Core** | Node.js, Express.js (ES Modules) |
| **Database & ODM** | MongoDB, Mongoose |
| **Authentication** | Firebase Authentication (OAuth 2.0 Google Provider), JWT, HTTP-Only Cookies |
| **Payment Gateway** | Razorpay Node SDK (Order creation & signature HMAC verification) |

---

## System Architecture & Directory Structure

```text
morphyxui/
├── client/                           # React Frontend Application
│   ├── public/                       # Static public assets (Favicon, Backgrounds)
│   ├── src/
│   │   ├── components/               # Shared interface primitives
│   │   │   ├── Auth.jsx              # Dual-panel Google OAuth modal
│   │   │   ├── CustomCursor.jsx      # Fluid trailing circular blend-mode cursor
│   │   │   └── LiveComponentPreview.jsx # React-Live sandbox viewport
│   │   ├── pages/                    # Core view engines
│   │   │   ├── Home.jsx              # Hero, service strips, editorial showcases
│   │   │   ├── Generate.jsx          # Neural Component Studio
│   │   │   ├── MyComponents.jsx      # User authenticated private component archive
│   │   │   ├── AllComponents.jsx     # Public component directory explorer
│   │   │   ├── AdminDashboard.jsx    # Telemetry graphs, component registry manager
│   │   │   ├── Pricing.jsx           # Compute token checkout & Razorpay checkout
│   │   │   └── Docs.jsx              # Architecture specs, guides & API tables
│   │   ├── redux/
│   │   │   ├── store.js              # Redux central configuration
│   │   │   └── userSlice.js          # Authentication, tokens, and component caches
│   │   ├── utils/                    # Firebase configuration and auth provider
│   │   ├── App.jsx                   # Route declarations and root layout
│   │   └── main.jsx                  # React DOM bootstrap
│   ├── tailwind.config.js            # Design tokens and custom theme extension
│   └── vite.config.js
│
└── morphyxui-server/                 # Express Backend API
    ├── configs/                      # Razorpay, DB, and environment configurations
    ├── controllers/                  # Business logic
    │   ├── auth.controller.js        # Google authentication & JWT issue
    │   ├── component.controller.js   # Save, fetch, generate, & publish pipeline
    │   └── payment.controller.js     # Order creation & signature verification
    ├── middlewares/                  # Auth token verification & role validators
    ├── models/                       # Mongoose schemas (User, Component, Payment)
    ├── routes/                       # Express REST router declarations
    ├── index.js                      # Server entry point & CORS configuration
    └── package.json
