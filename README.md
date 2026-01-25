# RedNUS

A Reddit-like forum application for NUS students built with Next.js and Go.

CVWO 2026 - Winter Assignment

## Features

- User authentication with JWT
- Create and manage topics
- Post discussions within topics
- Comment on posts
- Edit and delete your own content
- Admin dashboard for API testing
- Responsive UI with dark theme

## Tech Stack

**Frontend:**
- Next.js
- React
- Tailwind CSS

**Backend:**
- Go with Gin framework
- PostgreSQL with GORM
- JWT authentication
- bcrypt password hashing

## Prerequisites

- Node.js (v18 or higher)
- Go (v1.21 or higher, v1.25.0 recommended)
- PostgreSQL database

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a `.env` file with your database URL:
```env
PORT=8080
DB_URL=postgresql://username:password@localhost:5432/rednus
```

3. Install dependencies:
```bash
go mod download
```

4. Run database migrations:
```bash
go run migrate/migrate.go
```

5. Seed the database with sample data:
```bash
go run seed/seed.go
```

6. Start the backend server:
```bash
go run .
```

The backend will run on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_USE_MOCK_DATA=false
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Default Users

After seeding the database, you can log in with these accounts:
- **Username:** alice, bob, charlie, admin123123
- **Password:** password

The `admin123123` user has admin privileges and can access the developer dashboard at `/admin`.

## Project Structure

```
rednus/
├── backend/           # Go backend
│   ├── controllers/   # Request handlers
│   ├── models/        # Database models
│   ├── middleware/    # JWT auth middleware
│   ├── initializers/  # Database & env setup
│   └── routes.go      # API routes
└── frontend/          # Next.js frontend
    ├── app/           # Pages and routes
    ├── components/    # React components
    ├── api/           # API client functions
    └── lib/           # Utilities and auth
```

## AI Decleration

I have used AI within the allowed restrictions of the assignment. Specifically:

- Learning and clarifying concepts (such as RESTful API design in Go, JWT authentication flow, and React/Next.js patterns.)

- Understanding error messages and unexpected behaviour (e.g. Go compile errors, CORS issues, frontend–backend integration problems).

- Reviewing and reasoning about code that I had written myself, to check for potential errors or code violations.

- Getting high-level guidance when stuck (e.g. suggested approaches or things to investigate), without copying generated code directly into the project.