# TaskFlow — Agent Instructions

TaskFlow is a MERN full-stack task management app with **hexagonal architecture (Ports & Adapters)**.  
Stack: **Node.js + Express + MongoDB/Mongoose** (backend) · **React + Context API + Axios** (frontend)

---

## Project Structure

```
TaskFlow/
├── backend/          # Node.js + Express API
│   └── src/
│       ├── domain/           # Entities, interfaces (ports), domain services
│       ├── application/      # Use cases (orchestrate domain + ports)
│       ├── infrastructure/   # Mongoose models, DB repositories (adapters), server config
│       ├── interfaces/       # Express controllers, routes, middlewares
│       └── app.js
├── frontend/         # React SPA
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── pages/            # Route-level pages
│       ├── services/         # Axios API wrappers
│       ├── hooks/            # Custom React hooks
│       ├── context/          # Context API providers (auth, tasks)
│       ├── routes/           # React Router DOM config + protected routes
│       ├── layouts/          # Shared layout components
│       └── utils/
└── AGENTS.md
```

---

## Build & Run Commands

```bash
# Backend
cd backend && npm install
cp .env.example .env          # fill in MONGO_URI, JWT_SECRET, PORT
npm run dev                   # nodemon

# Frontend
cd frontend && npm install
cp .env.example .env          # fill in VITE_API_URL
npm run dev                   # Vite dev server
```

Tests: `npm test` in each workspace (Jest for backend, Vitest for frontend).

---

## Architecture Rules

See [.github/instructions/backend.instructions.md](.github/instructions/backend.instructions.md) for the full hexagonal layer guide.

**Critical constraints:**

- Domain layer has **zero** framework/library imports — pure JS classes only.
- Application use cases receive injected **repository interfaces** (ports), never Mongoose directly.
- Infrastructure repositories implement the domain port interfaces.
- Controllers call use cases only — never domain services or repositories directly.
- Dependency direction: `interfaces → application → domain ← infrastructure`

---

## API Conventions

Base URL: `/api`

| Resource          | Endpoint                                               |
| ----------------- | ------------------------------------------------------ |
| Auth              | `POST /api/auth/register`, `POST /api/auth/login`      |
| Tasks (protected) | `GET/POST /api/tasks`, `GET/PUT/DELETE /api/tasks/:id` |

All responses follow this envelope:

```json
{ "success": true,  "data": {} }
{ "success": false, "message": "Human-readable error" }
```

HTTP status codes must be semantically correct (200, 201, 400, 401, 403, 404, 500).

---

## Auth Flow

1. Client sends credentials → `/api/auth/login` returns JWT.
2. Token stored in `localStorage` on frontend.
3. Every protected request sends `Authorization: Bearer <token>`.
4. `authMiddleware` verifies token, attaches `req.user` to the request.

---

## Key Conventions

- **Validation**: Zod (preferred) or Joi in the `interfaces/middlewares/` layer — never inside use cases.
- **Password hashing**: `bcrypt` with salt rounds ≥ 10, only in the infrastructure user repository.
- **Error handling**: All errors bubble to `interfaces/middlewares/errorHandler.js` — throw typed errors, don't send responses inside domain/application layers.
- **Env vars**: `dotenv` in `infrastructure/server/` only; access via `process.env` throughout.
- **Task ownership**: Every task query must filter by `userId` from `req.user` — never expose other users' tasks.
- **Frontend state**: Auth state in `AuthContext`, task list state in `TaskContext` (or Zustand store).
- **Axios instance**: Single configured instance in `frontend/src/services/api.js` with interceptors for the auth header and error normalization.

---

## Common Pitfalls

- Do **not** add mongoose/express imports inside `domain/` or `application/`.
- Do **not** put business logic inside controllers — delegate to use cases.
- Remember to handle expired/invalid JWT with a 401 and clear the frontend token on 401 responses (via Axios interceptor).
- Task `status` is an enum: `'pendiente' | 'en progreso' | 'completada'` — validate strictly.

---

## Frontend Guide

See [.github/instructions/frontend.instructions.md](.github/instructions/frontend.instructions.md) for component and routing conventions.
