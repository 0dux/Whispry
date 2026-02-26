<p align="center">
  <h1 align="center">💬 Whispry</h1>
  <p align="center">A fast, minimal chat app for real-time conversations.</p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/Socket.IO-4-010101?logo=socket.io" alt="Socket.IO" />
  <img src="https://img.shields.io/badge/PostgreSQL-blue?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
</p>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running in Development](#running-in-development)
- [API Reference](#-api-reference)
- [WebSocket Events](#-websocket-events)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🔍 Overview

**Whispry** is a full-stack, real-time chat application built with a modern TypeScript-first approach. It pairs a **Next.js 16** frontend with an **Express 5** backend, using **Socket.IO** for instant messaging and **PostgreSQL** (via **Prisma ORM**) for persistence. The app supports text & image messaging, user presence tracking, profile picture uploads, and transactional welcome emails — all wrapped in a clean, responsive UI.

---

## ✨ Features

| Feature                            | Description                                               |
| ---------------------------------- | --------------------------------------------------------- |
| **Real-Time Messaging**            | Instant text & image messages powered by Socket.IO        |
| **Online Presence**                | See which users are currently online in real time         |
| **User Authentication**            | Secure JWT-based auth with bcrypt password hashing        |
| **Image Sharing**                  | Send images in chat with Cloudinary CDN storage           |
| **Profile Avatars**                | Upload & update profile pictures via Cloudinary           |
| **Welcome Emails**                 | Transactional welcome emails via Resend on signup         |
| **Rate Limiting & Bot Protection** | Arcjet middleware for rate limiting and bot detection     |
| **Input Validation**               | Server-side validation with Zod schemas                   |
| **Optimistic UI Updates**          | Instant message rendering before server confirmation      |
| **Responsive Design**              | Mobile-friendly UI with Tailwind CSS, DaisyUI & shadcn/ui |
| **Dark / Light / Lofi Themes**     | Multiple theme support via DaisyUI                        |
| **Particle Effects**               | Ambient particle background animation                     |

---

## 🛠 Tech Stack

### Client

| Technology                                                                                                                  | Purpose                         |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| <img src="https://cdn.simpleicons.org/nextdotjs/000000" width="14" alt=""> [Next.js 16](https://nextjs.org/)                | React framework with App Router |
| <img src="https://cdn.simpleicons.org/react/61DAFB" width="14" alt=""> [React 19](https://react.dev/)                       | UI library                      |
| <img src="https://cdn.simpleicons.org/typescript/3178C6" width="14" alt=""> [TypeScript 5](https://www.typescriptlang.org/) | Type safety                     |
| <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" width="14" alt=""> [Tailwind CSS 4](https://tailwindcss.com/)     | Utility-first CSS               |
| <img src="https://cdn.simpleicons.org/daisyui/5A0EF8" width="14" alt=""> [DaisyUI 5](https://daisyui.com/)                  | Tailwind component library      |
| <img src="https://cdn.simpleicons.org/shadcnui/000000" width="14" alt=""> [shadcn/ui](https://ui.shadcn.com/)               | Accessible UI primitives        |
| <img src="https://cdn.simpleicons.org/zustand/453B37" width="14" alt=""> [Zustand](https://zustand-demo.pmnd.rs/)           | Lightweight state management    |
| <img src="https://cdn.simpleicons.org/socketdotio/010101" width="14" alt=""> [Socket.IO Client](https://socket.io/)         | Real-time client                |
| <img src="https://cdn.simpleicons.org/framer/0055FF" width="14" alt=""> [Framer Motion](https://motion.dev/)                | Animations                      |
| <img src="https://cdn.simpleicons.org/axios/5A29E4" width="14" alt=""> [Axios](https://axios-http.com/)                     | HTTP client                     |
| <img src="https://cdn.simpleicons.org/lucide/F56565" width="14" alt=""> [Lucide React](https://lucide.dev/)                 | Icon library                    |
| 🔔 [react-hot-toast](https://react-hot-toast.com/)                                                                          | Toast notifications             |

### Server

| Technology                                                                                                            | Purpose                        |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| <img src="https://cdn.simpleicons.org/express/000000" width="14" alt=""> [Express 5](https://expressjs.com/)          | Web framework                  |
| <img src="https://cdn.simpleicons.org/socketdotio/010101" width="14" alt=""> [Socket.IO 4](https://socket.io/)        | Real-time WebSocket server     |
| <img src="https://cdn.simpleicons.org/prisma/2D3748" width="14" alt=""> [Prisma 7](https://www.prisma.io/)            | ORM for PostgreSQL             |
| <img src="https://cdn.simpleicons.org/postgresql/4169E1" width="14" alt=""> [PostgreSQL](https://www.postgresql.org/) | Relational database            |
| <img src="https://cdn.simpleicons.org/jsonwebtokens/000000" width="14" alt=""> [JSON Web Tokens](https://jwt.io/)     | Authentication                 |
| 🔒 [bcrypt](https://github.com/kelektiv/node.bcrypt.js)                                                               | Password hashing               |
| <img src="https://cdn.simpleicons.org/cloudinary/3448C5" width="14" alt=""> [Cloudinary](https://cloudinary.com/)     | Image storage & CDN            |
| <img src="https://cdn.simpleicons.org/resend/000000" width="14" alt=""> [Resend](https://resend.com/)                 | Transactional emails           |
| 🛡️ [Arcjet](https://arcjet.com/)                                                                                      | Rate limiting & bot protection |
| <img src="https://cdn.simpleicons.org/zod/3E67B1" width="14" alt=""> [Zod](https://zod.dev/)                          | Schema validation              |

---

## 📁 Project Structure

```
Whispry/
├── client/                     # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/         # Auth pages (login, signup)
│   │   │   ├── chat/           # Chat page
│   │   │   ├── globals.css     # Global styles & theme tokens
│   │   │   ├── layout.tsx      # Root layout (fonts, toaster, particles)
│   │   │   └── page.tsx        # Landing page (auth redirect)
│   │   ├── components/         # React components
│   │   │   ├── ActiveTabSwitch.tsx
│   │   │   ├── ChatContainer.tsx
│   │   │   ├── ChatHeader.tsx
│   │   │   ├── ChatList.tsx
│   │   │   ├── ContactList.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   ├── ProfileHeader.tsx
│   │   │   ├── NoConversationPlaceholder.tsx
│   │   │   └── ui/             # shadcn/ui primitives
│   │   ├── lib/                # Axios instance, utilities
│   │   ├── store/              # Zustand stores
│   │   │   ├── useAuthStore.ts
│   │   │   └── useChatStore.ts
│   │   └── types/              # TypeScript interfaces
│   └── package.json
│
├── server/                     # Express backend
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema (User, Message)
│   │   └── migrations/         # Prisma migrations
│   ├── src/
│   │   ├── configs/            # Service configs
│   │   │   ├── arcjet.ts       # Arcjet rate limiter
│   │   │   ├── cloudinary.ts   # Cloudinary SDK
│   │   │   ├── prisma.ts       # Prisma client
│   │   │   ├── resend.ts       # Resend email client
│   │   │   └── socket.ts       # Socket.IO server + auth
│   │   ├── controllers/        # Route handlers
│   │   │   ├── auth.controller.ts
│   │   │   └── message.controller.ts
│   │   ├── emails/             # Email templates & handlers
│   │   ├── enums/              # HTTP status codes
│   │   ├── lib/                # Env config, JWT utils
│   │   ├── middlewares/        # Auth, Arcjet, Socket middleware
│   │   ├── routes/             # Express routers
│   │   ├── types/              # Express type augmentations
│   │   └── server.ts           # App entry point
│   └── package.json
│
├── package.json                # Root scripts (monorepo)
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10
- **PostgreSQL** database (local or hosted, e.g. [Neon](https://neon.tech), [Supabase](https://supabase.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/0dux/Whispry.git
cd Whispry

# Install all dependencies (client + server)
npm run install:all
```

### Environment Variables

Create `.env` files in both `client/` and `server/` directories.

#### `client/.env`

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8080
```

#### `server/.env`

```env
# Server
PORT=8080
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/whispry

# Authentication
JWT_SECRET=your-jwt-secret
SALT_ROUNDS=10

# Cloudinary (image uploads)
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Resend (emails)
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_FROM_NAME=Whispry

# Client URL (for CORS & emails)
CLIENT_URL=http://localhost:3000

# Arcjet (rate limiting)
ARCJET_API_KEY=your-arcjet-key
ARCJET_ENV=development
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate --schema=./server/prisma/schema.prisma

# Run migrations
npx prisma migrate deploy --schema=./server/prisma/schema.prisma
```

### Running in Development

```bash
# Terminal 1 — Start the backend (with hot-reload via nodemon + tsx)
npm run dev:server

# Terminal 2 — Start the frontend (Next.js dev server)
npm run dev:client
```

| Service     | URL                     |
| ----------- | ----------------------- |
| Frontend    | `http://localhost:3000` |
| Backend API | `http://localhost:8080` |
| Socket.IO   | `ws://localhost:8080`   |

---

## 📡 API Reference

All API routes are prefixed with `/api`. Protected routes require a valid JWT cookie.

### Auth Routes — `/api/auth`

| Method | Endpoint          | Auth | Description                  |
| ------ | ----------------- | ---- | ---------------------------- |
| `POST` | `/register`       | ✗    | Create a new account         |
| `POST` | `/login`          | ✗    | Log in with credentials      |
| `POST` | `/logout`         | ✗    | Clear auth cookie            |
| `PUT`  | `/update-profile` | ✓    | Upload a new profile picture |
| `GET`  | `/verify`         | ✓    | Verify current session       |

### Message Routes — `/api/messages`

| Method | Endpoint    | Auth | Description                     |
| ------ | ----------- | ---- | ------------------------------- |
| `GET`  | `/contacts` | ✓    | Get all users (contacts)        |
| `GET`  | `/chats`    | ✓    | Get users you've chatted with   |
| `GET`  | `/:id`      | ✓    | Get message history with a user |
| `POST` | `/send/:id` | ✓    | Send a text/image message       |

---

## 🔌 WebSocket Events

Socket.IO connections are authenticated via JWT cookie middleware.

| Event            | Direction       | Payload               | Description                                          |
| ---------------- | --------------- | --------------------- | ---------------------------------------------------- |
| `getOnlineUsers` | Server → Client | `string[]` (user IDs) | Broadcasts the list of currently online users        |
| `newMessage`     | Server → Client | `Message` object      | Delivers a new message to the recipient in real time |

---

## 🚢 Deployment

Whispry is configured for single-server deployment (e.g. [Render](https://render.com)) where the Express backend serves the Next.js production build.

### Build for Production

```bash
# Full build: install deps → build client → generate Prisma → compile server
npm run build

# Start the production server
npm start
```

This will:

1. Install dependencies for both `client/` and `server/`
2. Build the Next.js app as a [standalone output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)
3. Generate the Prisma client
4. Compile the TypeScript server to `server/dist/`
5. Serve everything from a single Express process on the configured `PORT`

### Production Environment

Set `NODE_ENV=production` and update `CLIENT_URL` to your deployed URL. The server will automatically configure CORS and serve the Next.js frontend.

---

## 📜 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
