# TaskApp Backend

## Overview
This is the server-side code for The TaskApp. Build with Express.js, Typescript, MongoDB & Supabase.
<br>Deployed in Railway : https://task-app-backend-production-1432.up.railway.app/

*** Decided to re-write the project Using Hono & Bun as I couldn't find any good free hosting site for express server ***

## Features
- Manage task with four categories: Daily(resets everynight), Weekly(resets on every Sunday night), Monthly (resets on last night of the month) & General that never resets.
- Take notes and manage them with different tags.
- Manage Profile with Authentication & Authorization. 

## Technology Used
- **Express.js** with TypeScript
- **MongoDB** NoSQL Database for task and note storage
- **Supabase** SQL Database for user profiles & Authentication
- **node-cron** for task scheduling
- **JWT** for cookie based session manage

## API Endpoints

### User Endpoints (`/api/user`)

| Method | Endpoint                | Body                                  | Protected |
|--------|-------------------------|---------------------------------------|-----------|
| POST   | /signup                 | `{ email, password, name, weekday }`  | No        |
| POST   | /login                  | `{ email, password }`                 | No        |
| POST   | /reset                  | `{ email }`                           | No        |
| GET    | /:email                 | `-`                                   | Yes       |
| POST   | /logout                 | `-`                                   | Yes       |
| PUT    | /update/:email          | `{ name, weekday }`                   | Yes       |
| DELETE | /delete/:email          | `-`                                   | Yes       |

### Task Endpoints (`/api/tasks`)

| Method | Endpoint                | Body                                  | Protected |
|--------|-------------------------|---------------------------------------|-----------|
| POST   | /                       | `{ text, status, mail, type }`        | Yes       |
| GET    | /:mail                  | `-`                                   | Yes       |
| PUT    | /:id                    | `{ text, status }`                    | Yes       |
| DELETE | /:id                    | `-`                                   | Yes       |

### Note Endpoints (`/api/notes`)

| Method | Endpoint                | Body                                  | Protected |
|--------|-------------------------|---------------------------------------|-----------|
| POST   | /                       | `{ text, mail }`                      | Yes       |
| GET    | /:mail                  | `-`                                   | Yes       |
| PUT    | /:id                    | `{ text }`                            | Yes       |
| DELETE | /:id                    | `-`                                   | Yes       |


## Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/SayedTahsin/Task-App-Backend.git
   cd Task-App-Backend
   ```
2. setup .env file
   ```bash
    MONGO_URL=
    PORT=8000
    SUPABASE_URL=
    SUPABASE_KEY=
    JWT_SECRET=
   ```
3. Install dependecies & Run the Dev server
   ```bash
   npm install & npm run dev
   ```
