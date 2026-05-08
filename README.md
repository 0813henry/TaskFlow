# TaskFlow

Aplicación full-stack de gestión de tareas construida con el stack **MERN** e implementando **Arquitectura Hexagonal (Ports & Adapters)**.

---

## Tecnologías

| Capa           | Tecnología           |
| -------------- | -------------------- |
| Base de datos  | MongoDB + Mongoose   |
| API            | Node.js + Express.js |
| Autenticación  | JWT + bcrypt         |
| Validación     | Zod                  |
| Frontend       | React 18 + Vite      |
| Estado         | Context API          |
| HTTP Client    | Axios                |
| Estilos        | Tailwind CSS         |
| Notificaciones | react-hot-toast      |

---

## Funcionalidades

- ✅ Registro e inicio de sesión con JWT
- ✅ Hash de contraseñas con bcrypt (12 rondas)
- ✅ CRUD completo de tareas
- ✅ Filtrado por estado (pendiente / en progreso / completada)
- ✅ Propiedad estricta de tareas por usuario
- ✅ Manejo centralizado de errores
- ✅ Validaciones con Zod en backend y frontend
- ✅ Rutas protegidas en frontend
- ✅ Loading states y toast notifications
- ✅ Diseño moderno responsive (dark theme)

---

## Instalación

### Prerequisitos

- Node.js ≥ 18
- MongoDB (local o Atlas)

### Backend

```bash
cd backend
npm install
cp .env.example .env   # Edita con tus valores
npm run dev            # Inicia en http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # Edita con VITE_API_URL
npm run dev            # Inicia en http://localhost:3000
```

---

## Variables de entorno

### `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=tu_clave_secreta_muy_segura
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### `frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Scripts

```bash
# Backend
npm run dev     # Servidor con nodemon (hot-reload)
npm run start   # Servidor de producción
npm run test    # Jest

# Frontend
npm run dev     # Vite dev server
npm run build   # Build de producción
npm run test    # Vitest
```

---

## Endpoints de la API

### Auth — `/api/auth`

| Método | Ruta                 | Descripción       | Auth |
| ------ | -------------------- | ----------------- | ---- |
| POST   | `/api/auth/register` | Registrar usuario | No   |
| POST   | `/api/auth/login`    | Iniciar sesión    | No   |

#### POST /api/auth/register

```json
// Request
{ "nombre": "Juan", "email": "juan@email.com", "password": "123456" }

// Response 201
{ "success": true, "data": { "id": "...", "nombre": "Juan", "email": "juan@email.com" } }
```

#### POST /api/auth/login

```json
// Request
{ "email": "juan@email.com", "password": "123456" }

// Response 200
{ "success": true, "data": { "token": "eyJ...", "user": { "id": "...", "nombre": "Juan", "email": "..." } } }
```

### Tasks — `/api/tasks` (requiere Bearer token)

| Método | Ruta                          | Descripción                          |
| ------ | ----------------------------- | ------------------------------------ |
| GET    | `/api/tasks`                  | Obtener todas las tareas del usuario |
| GET    | `/api/tasks?status=pendiente` | Filtrar por estado                   |
| GET    | `/api/tasks/:id`              | Obtener una tarea por ID             |
| POST   | `/api/tasks`                  | Crear tarea                          |
| PUT    | `/api/tasks/:id`              | Actualizar tarea                     |
| DELETE | `/api/tasks/:id`              | Eliminar tarea                       |

#### POST /api/tasks

```json
// Request
{ "title": "Mi tarea", "description": "Descripción opcional", "status": "pendiente" }

// Response 201
{ "success": true, "data": { "_id": "...", "title": "Mi tarea", "status": "pendiente", ... } }
```

### Formato de errores

```json
{ "success": false, "message": "Descripción del error" }
```

---

## Estructura del proyecto

```
TaskFlow/
├── backend/
│   └── src/
│       ├── domain/                      ← Núcleo del negocio (sin frameworks)
│       │   ├── entities/
│       │   │   ├── User.js              ← Entidad usuario
│       │   │   └── Task.js              ← Entidad tarea + enum de estados
│       │   ├── repositories/
│       │   │   ├── IUserRepository.js   ← Puerto (interfaz abstracta)
│       │   │   └── ITaskRepository.js   ← Puerto (interfaz abstracta)
│       │   └── errors/
│       │       └── AppError.js          ← Errores tipados del dominio
│       │
│       ├── application/                 ← Casos de uso (orquestación)
│       │   └── use-cases/
│       │       ├── auth/
│       │       │   ├── RegisterUserUseCase.js
│       │       │   └── LoginUserUseCase.js
│       │       └── tasks/
│       │           ├── CreateTaskUseCase.js
│       │           ├── GetTasksUseCase.js
│       │           ├── GetTaskByIdUseCase.js
│       │           ├── UpdateTaskUseCase.js
│       │           └── DeleteTaskUseCase.js
│       │
│       ├── infrastructure/              ← Adaptadores técnicos
│       │   ├── database/
│       │   │   ├── connection.js        ← Conexión MongoDB
│       │   │   └── models/              ← Esquemas Mongoose
│       │   ├── repositories/            ← Implementaciones de los puertos
│       │   │   ├── MongoUserRepository.js
│       │   │   └── MongoTaskRepository.js
│       │   ├── services/
│       │   │   └── JwtService.js        ← Firma/verificación JWT
│       │   └── server/
│       │       └── index.js             ← Entrada: dotenv + servidor
│       │
│       ├── interfaces/                  ← Capa HTTP
│       │   ├── controllers/             ← Extraen request → llaman use case → responden
│       │   ├── middlewares/
│       │   │   ├── authMiddleware.js    ← Verifica JWT, adjunta req.user
│       │   │   ├── errorHandler.js      ← Manejador centralizado de errores
│       │   │   ├── validate.js          ← Middleware factory de Zod
│       │   │   └── schemas/             ← Schemas Zod por recurso
│       │   └── routes/
│       │
│       └── app.js                       ← Express app (sin dotenv, sin listen)
│
└── frontend/
    └── src/
        ├── services/                    ← Módulos Axios por recurso
        │   ├── api.js                   ← Instancia Axios + interceptores
        │   ├── authService.js
        │   └── taskService.js
        ├── context/
        │   ├── AuthContext.jsx          ← Estado de autenticación global
        │   └── TaskContext.jsx          ← Estado de tareas global
        ├── routes/
        │   ├── AppRouter.jsx            ← Definición de rutas
        │   └── ProtectedRoute.jsx       ← Guard para rutas privadas
        ├── layouts/
        │   └── MainLayout.jsx           ← Shell con Navbar
        ├── pages/                       ← Un archivo por ruta
        ├── components/                  ← Componentes reutilizables
        └── utils/
            └── statusHelpers.js         ← Configuración de estados
```

---

## Arquitectura Hexagonal — Explicación

La arquitectura hexagonal separa la aplicación en capas concéntricas, donde el **dominio** está en el centro y no depende de nada externo.

```
          ┌─────────────────────────────────┐
          │         INTERFACES              │  ← HTTP, Express
          │   ┌─────────────────────────┐   │
          │   │      APPLICATION        │   │  ← Casos de uso
          │   │   ┌─────────────────┐   │   │
          │   │   │     DOMAIN      │   │   │  ← Entidades, Puertos
          │   │   └─────────────────┘   │   │
          │   └─────────────────────────┘   │
          │         INFRASTRUCTURE          │  ← MongoDB, JWT, bcrypt
          └─────────────────────────────────┘
```

**Regla de dependencia:** Las capas externas pueden importar capas internas. Nunca al revés.

| Capa           | Contiene                                         | Importa de                   |
| -------------- | ------------------------------------------------ | ---------------------------- |
| Domain         | Entidades, Interfaces (Puertos), Errores tipados | — (nada)                     |
| Application    | Casos de uso                                     | Domain                       |
| Infrastructure | Mongoose, bcrypt, JWT                            | Domain                       |
| Interfaces     | Controllers, Middlewares, Routes                 | Application + Infrastructure |

---

## Flujo de autenticación

```
1. POST /api/auth/login  →  LoginPage (frontend)
2. Axios envía { email, password }
3. validate(loginSchema)  →  Zod valida el body
4. authController.login()  →  extrae req.body
5. LoginUserUseCase.execute()  →  llama al puerto IUserRepository
6. MongoUserRepository.findByEmail()  →  busca en MongoDB
7. MongoUserRepository.verifyPassword()  →  bcrypt.compare()
8. JwtService.sign()  →  genera JWT con { id, email }
9. Response: { token, user }
10. Frontend guarda token en localStorage
11. AuthContext actualiza estado user
12. Redirect → /dashboard
```

---

## Flujo de una petición protegida

```
GET /api/tasks

1. api.js interceptor  →  adjunta "Authorization: Bearer <token>"
2. authMiddleware  →  JwtService.verify(token)  →  req.user = { id, email }
3. taskController.getAll()  →  llama GetTasksUseCase
4. GetTasksUseCase.execute({ userId })
5. MongoTaskRepository.findByUserId(userId)  →  query con filtro por userId
6. Response: { success: true, data: [...tasks] }
7. TaskContext.setTasks(data)  →  React re-renderiza TaskListPage
```

---

## Seguridad implementada

- JWT verificado en cada request protegida
- bcrypt con 12 rondas de sal
- Zod sanitiza y coerciona el body antes de que llegue al controller
- Todas las queries de tareas filtran por `userId` — imposible acceder a tareas de otros usuarios
- Mensajes de error de login genéricos (anti-enumeración de emails)
- Token expirado devuelve 401 y el frontend limpia localStorage automáticamente

---

## Estados de tarea

| Valor en DB   | Etiqueta    | Color    |
| ------------- | ----------- | -------- |
| `pendiente`   | Pendiente   | Amarillo |
| `en progreso` | En Progreso | Azul     |
| `completada`  | Completada  | Verde    |
