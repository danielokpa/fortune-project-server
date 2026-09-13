# UNICAL QR Attendance Backend

NestJS API for QR-based class attendance with PIN and WebAuthn (fingerprint) verification.

## Stack

- NestJS 11 + TypeScript
- Prisma 7 + SQLite (libSQL adapter)
- JWT auth and role-based access (`ADMIN`, `LECTURER`, `STUDENT`)
- `@simplewebauthn/server` for fingerprint credentials

## Setup

```bash
cd fortune-project-server
cp .env.template .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
```

Swagger: `http://localhost:3000/docs`  
API prefix: `/api`

## Seed accounts

| Role | Email | Password | Extra |
|---|---|---|---|
| Admin | admin@unical.edu.ng | Admin123! | |
| Lecturer | jane.lecturer@unical.edu.ng | Lecturer123! | CSC 401 |
| Student | john.student@unical.edu.ng | Student123! | PIN `1234`, matric `CS/2021/001` |

## Main endpoints

### Auth
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PATCH /api/auth/change-password`

### Users (admin)
- `GET /api/users`
- `POST /api/users/lecturers`
- `POST /api/users/students`

### Courses
- `POST /api/courses`
- `GET /api/courses`
- `GET /api/courses/:id`
- `POST /api/courses/:id/enrollments`

### Sessions & attendance
- `POST /api/sessions` — open session, returns `qrToken`
- `POST /api/sessions/:id/refresh-qr`
- `POST /api/sessions/:id/close`
- `GET /api/courses/:id/sessions`
- `POST /api/attendance/mark/pin` — `{ qrToken, pin }`
- `POST /api/webauthn/register/options`
- `POST /api/webauthn/register/verify`
- `POST /api/attendance/mark/fingerprint/options`
- `POST /api/attendance/mark/fingerprint/verify`

Fingerprint is locked after 3 failed attempts per session; students then use PIN.

### Reports
- `GET /api/reports/courses/:id` — lecturer/admin, flags below 75%
- `GET /api/reports/me` — student summary

## Environment

See `.env.template` for `DATABASE_URL`, JWT, WebAuthn RP, and `ATTENDANCE_THRESHOLD`.
