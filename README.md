<div align="center">

# Todo Manager

### Where tasks become tales

**A modern full-stack task management app with JWT auth, priority tracking, and a sleek dark UI.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/Neon_PG-Serverless-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://neon.tech)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat-square&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

![Dashboard Preview](https://img.shields.io/badge/Dark_Mode-Enabled-brightgreen?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Design-blueviolet?style=for-the-badge)
![Production](https://img.shields.io/badge/Status-Production-brightgreen?style=for-the-badge)

</div>

---

<br>

## Features

| Feature | Description |
|---------|-------------|
| **JWT Authentication** | Secure register/login with 24h token expiry |
| **Task CRUD** | Create, read, update, delete tasks |
| **Smart Filters** | View All, Active, or Completed tasks |
| **Priority System** | Low (green) / Medium (yellow) / High (red) badges |
| **Due Dates** | Overdue detection with visual warnings |
| **Dark UI** | Modern dark theme with glassmorphism effects |
| **Responsive** | Works on desktop, tablet, and mobile |
| **Per-User Isolation** | Each user only sees their own tasks |

---

<br>

## Tech Stack

```
Frontend          Backend              Database
─────────         ─────────            ─────────
React 18          Spring Boot 3.2      Neon PostgreSQL
Vite 5            Spring Security      (Serverless)
Axios             Spring Data JPA      Hibernate ORM
React Router      JWT (jjwt 0.12)
jwt-decode        Lombok
```

---

<br>

## Getting Started

### Prerequisites

- [Java 17](https://openjdk.org/projects/jdk/17/) (Eclipse Adoptium recommended)
- [Node.js 18+](https://nodejs.org/)
- [Neon PostgreSQL](https://neon.tech) account (free tier works)

### 1. Backend Setup

```bash
cd backend

# Set environment variables (Windows CMD)
set DB_URL=jdbc:postgresql://ep-your-endpoint.neon.tech/neondb?sslmode=require
set DB_USERNAME=your_neon_username
set DB_PASSWORD=your_neon_password
set DB_DRIVER=org.postgresql.Driver
set DB_PLATFORM=org.hibernate.dialect.PostgreSQLDialect

# Run
.\mvnw.cmd spring-boot:run
```

> API starts at **http://localhost:8080**

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> App starts at **http://localhost:5173**

---

<br>

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Create account | Public |
| `POST` | `/api/auth/login` | Sign in | Public |

### Tasks

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/tasks?filter=all` | Get all tasks | Required |
| `POST` | `/api/tasks` | Create task | Required |
| `PUT` | `/api/tasks/{id}` | Update task | Required |
| `DELETE` | `/api/tasks/{id}` | Delete task | Required |
| `PATCH` | `/api/tasks/{id}/complete` | Toggle complete | Required |

---

<br>

## Project Structure

```
todomanager/
├── backend/                        Spring Boot API
│   ├── src/main/java/com/todoapp/
│   │   ├── controller/             REST endpoints
│   │   ├── service/                Business logic
│   │   ├── repository/             Data access
│   │   ├── model/                  JPA entities (User, Task)
│   │   ├── security/               JWT filter, BCrypt, config
│   │   └── dto/                    Request/Response objects
│   ├── pom.xml                     Maven dependencies
│   └── application.properties      Config
│
└── frontend/                       React + Vite app
    └── src/
        ├── components/             TaskCard, TaskForm, Navbar
        ├── pages/                  Login, Register, Tasks
        ├── context/                AuthContext (JWT state)
        ├── api/                    Axios instance
        └── index.css               Global styles
```

---

<br>

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_URL` | PostgreSQL connection string | `jdbc:postgresql://ep-xxx.neon.tech/db?sslmode=require` |
| `DB_USERNAME` | Database username | `neondb_owner` |
| `DB_PASSWORD` | Database password | `your_password` |
| `JWT_SECRET` | Secret key for JWT signing | `any_random_long_string` |

---

<br>

## License

MIT

<br>

---

<div align="center">

**Built with passion by [zaydkassimi](https://github.com/zaydkassimi)**

</div>
