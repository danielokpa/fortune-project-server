# UNICAL QR Attendance System — Technical Documentation

This document describes how the **UNICAL QR Attendance** backend works. The API is a NestJS application (`unical-qr-attendance`) that records class attendance using a **short-lived QR code** plus a second factor: **device fingerprint (WebAuthn)** or a **student PIN**.

The intended institution is the University of Calabar. Clients are expected to be a web app (local Vite on port `5173`, or a deployed frontend such as the Vercel origin configured in CORS).

---

## 1. What the system does

A lecturer opens a class **attendance session**. The server issues a random **QR token** that expires after a short time (default **120 seconds**). Students scan that QR code in the authenticated student app, then prove identity with:

1. **Fingerprint / platform authenticator** (WebAuthn) — preferred, or
2. **PIN** — fallback, especially after three failed biometric attempts for that session.

The server only marks a student **PRESENT** if all of the following are true:

- The student is logged in as `STUDENT`.
- The QR token exists, the session is `OPEN`, and the token has not expired.
- The student is **enrolled** in the session’s course.
- The student has not already been marked for that session.

Lecturers and admins can list sessions, inspect who attended, close sessions, and generate **percentage reports** against a configurable threshold (default **75%**).

There is **no GPS / geofencing** in this backend. Presence is inferred from possessing a live QR token plus a second factor bound to the student account.

---

## 2. High-level architecture

```
┌─────────────────┐     HTTPS + Bearer JWT      ┌──────────────────────────┐
│  Web / mobile   │  ─────────────────────────► │  NestJS API              │
│  (student +     │     /api/...                │  global prefix: api      │
│   lecturer UI)  │                             │                          │
│                 │  WebAuthn (browser)         │  AuthModule              │
│  QR display     │  challenge/response         │  UsersModule             │
│  QR scan        │                             │  CoursesModule           │
└─────────────────┘                             │  AttendanceModule        │
                                                │  ReportsModule           │
                                                │  PrismaModule            │
                                                └────────────┬─────────────┘
                                                             │
                                                             ▼
                                                ┌──────────────────────────┐
                                                │  SQLite / Turso (libSQL) │
                                                │  Prisma ORM              │
                                                └──────────────────────────┘
```

**Stack**

| Layer | Technology |
| --- | --- |
| Runtime | NestJS 11, Express |
| Language | TypeScript |
| ORM | Prisma 7 |
| Database | SQLite locally (`file:./dev.db`); optional Turso/libSQL in production |
| Auth | JWT Bearer tokens (`@nestjs/jwt`) |
| Passwords / PINs | Argon2 (`argon2`) |
| Biometrics | WebAuthn via `@simplewebauthn/server` (platform authenticators) |
| Validation | `class-validator` + global `ValidationPipe` (HTTP 422 on invalid bodies) |
| API docs | Swagger UI at `/docs` (disabled when `NODE_ENV=production`) |

Active modules are registered in `src/app.module.ts`: **Auth, Users, Courses, Attendance, Reports**, plus Prisma, Config, EventEmitter, and Throttler config.

> **Note:** The repository still contains leftover files from an older “smart health monitor” codebase (patients, devices, SMS, Cloudflare uploads, etc.). Those modules are **not** imported into `AppModule` and are **not** part of the attendance product.

---

## 3. Domain model

Source of truth: `prisma/schema.prisma`.

### 3.1 Roles

| Role | Who | Typical actions |
| --- | --- | --- |
| `ADMIN` | System administrator | Create lecturers/students, list users, manage any course session, view any course report |
| `LECTURER` | Teaching staff | Create courses (assigned to themselves), enroll students, open/refresh/close sessions, view their course reports |
| `STUDENT` | Enrolled learner | Login, enroll fingerprint, scan QR and mark attendance, view personal attendance report |

A `User` always has `fullName`, unique `email`, `passwordHash`, and `role`. Only students have a related `Student` profile.

### 3.2 Entity relationships

```
User 1 ── 0..1 Student
User 1 ── * Course          (as lecturer)
User 1 ── * AttendanceSession (as lecturer who opened it)
Student 1 ── * Enrollment ── * Course
Course 1 ── * AttendanceSession 1 ── * AttendanceRecord ── 1 Student
Student 1 ── * WebAuthnCredential
User 1 ── * WebAuthnChallenge
AttendanceSession + Student ── 0..1 BiometricAttempt
User 1 ── * AuditLog
```

### 3.3 Tables and important constraints

**User** (`users`)

- Unique `email`.
- `passwordHash` never returned on list/get endpoints (repository uses a safe select).

**Student** (`students`)

- One-to-one with `User` (`userId` unique).
- Unique `matricNumber`.
- `department` string.
- Optional `pinHash` (Argon2). Without a PIN, PIN-based marking is rejected.

**Course** (`courses`)

- Unique `courseCode` (stored uppercase on create).
- `title`, `unitLoad`, `lecturerId`.

**Enrollment** (`enrollments`)

- Unique on `(studentId, courseId, academicSession)` so the same student can be enrolled again in a later academic year.
- Marking attendance only checks that **some** enrollment exists for that course; it does **not** require a matching academic-session string at scan time.

**AttendanceSession** (`attendance_sessions`)

- `qrToken` unique 64-character hex string (`randomBytes(32)`).
- `tokenExpiry` — QR is invalid after this instant even if status is still `OPEN`.
- `status`: `OPEN` or `CLOSED`.
- Closing a session does not delete records.

**AttendanceRecord** (`attendance_records`)

- Unique on `(sessionId, studentId)` — one mark per student per session.
- `verificationMethod`: `QR_FINGERPRINT` or `QR_PIN`.
- `status` is always `PRESENT` (no LATE / ABSENT enum values today). Absence is implied by a missing record.

**WebAuthnCredential** (`webauthn_credentials`)

- Primary key is the credential id from the authenticator.
- Stores `publicKey` (base64url), `signCount` (replay protection), optional `deviceInfo`.

**WebAuthnChallenge** (`webauthn_challenges`)

- Short-lived server challenge (`registration` or `authentication`), default **5 minutes**.
- Consumed (deleted) on verify so it cannot be reused.

**BiometricAttempt** (`biometric_attempts`)

- Unique `(sessionId, studentId)`.
- `failCount` incremented on failed fingerprint verification.
- At **3** failures, fingerprint is locked **for that session only**; PIN remains allowed.

**AuditLog** (`audit_logs`)

- Records `LOGIN`, `OPEN_SESSION`, `CLOSE_SESSION`, `MARK_ATTENDANCE`, `BIOMETRIC_LOCK` (and can hold other actions).
- `metadata` is a JSON string.

---

## 4. Runtime configuration

Loaded from environment via `src/config/app.config.ts` (`ConfigModule` is global).

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3000` | HTTP port |
| `API_PREFIX` | `api` | Global route prefix (`/api/...`) |
| `CORS_ORIGIN` | `http://localhost:3000`, `http://localhost:5173` | Comma-separated allowed origins; credentials enabled |
| `NODE_ENV` | — | Swagger is hidden when `production` |
| `JWT_SECRET` | dev fallback | Signs/verifies access tokens |
| `JWT_EXPIRES_IN` | `1d` | Token lifetime |
| `QR_TOKEN_SECRET` | falls back to JWT secret | **Configured but unused** — QR tokens are random, not HMAC-signed |
| `ATTENDANCE_THRESHOLD` | `75` | Report “below threshold” flag (%) |
| `WEBAUTHN_RP_ID` | `localhost` | WebAuthn relying-party ID (must match the frontend host) |
| `WEBAUTHN_ORIGIN` | `http://localhost:3000` in code; typically set to the frontend origin (e.g. `http://localhost:5173`) | Exact origin used to verify WebAuthn responses |
| `WEBAUTHN_RP_NAME` | `UNICAL QR Attendance` | Display name during authenticator registration |
| `RATE_LIMIT_TTL` | `60000` | Throttler window (ms) |
| `RATE_LIMIT_LIMIT` | `60` | Max requests per window |
| `DATABASE_URL` | `file:./dev.db` | Prisma / local SQLite |
| `TURSO_DATABASE_URL` | — | Preferred by `PrismaService` if set |
| `TURSO_AUTH_TOKEN` | — | Turso auth |

`PrismaService` connects with the **libSQL adapter**, preferring `TURSO_DATABASE_URL`, then `DATABASE_URL`, then `file:./prisma/dev.db`.

**CORS** allows `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS` and the `Authorization` header.

**Rate limiting:** `ThrottlerModule` is configured, but `ThrottlerGuard` is **not** applied globally, so the limits are not enforced unless a guard is added later.

---

## 5. Authentication and authorization

### 5.1 Login

`POST /api/auth/login`

Body:

```json
{ "email": "jane.lecturer@unical.edu.ng", "password": "Lecturer123!" }
```

Flow:

1. Look up user by email (lowercased in the repository).
2. Verify password with Argon2.
3. Sign a JWT payload:

```ts
{ sub, userId, email, userType }  // userType is ADMIN | LECTURER | STUDENT
```

4. Write an audit log (`LOGIN`).
5. Return `{ accessToken, user }` (password hash stripped).

Clients send `Authorization: Bearer <accessToken>` on all protected routes.

There is **no self-registration**. Accounts are created by an admin (or by the seed script).

### 5.2 Other auth endpoints

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/api/auth/me` | Any logged-in user | Profile (safe fields + student if present) |
| `PATCH` | `/api/auth/change-password` | Any logged-in user | Requires current password; new password min 8 chars |

### 5.3 Guards

- `@Auth()` → JWT required, any role.
- `@Auth([Role.ADMIN, Role.LECTURER])` → JWT + `RolesGuard`.
- Token is read only from the `Authorization` header (not cookies).

### 5.4 Extra ownership checks

Role guards are not enough for lecturers:

- Session open/refresh/close/get: lecturer must own the course **or** be admin.
- Course enroll / course report: same rule.
- Students can list only courses they are enrolled in; lecturers only courses they teach; admins see all.

---

## 6. User administration

All under `/api/users`, **admin only**.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/users` | Cursor-paginated list (`cursor`, `limit`, `search`, `role`) |
| `GET` | `/api/users/:id` | Single user |
| `POST` | `/api/users/lecturers` | Create lecturer (`fullName`, `email`, `password`) |
| `POST` | `/api/users/students` | Create student + profile (`matricNumber`, `department`, optional `pin`) |
| `PATCH` | `/api/users/:id` | Update `fullName` and/or `email` |

Student PIN is hashed with Argon2 when provided. Emails are stored lowercased on create.

---

## 7. Courses and enrollment

| Method | Path | Roles | Description |
| --- | --- | --- | --- |
| `POST` | `/api/courses` | Admin, lecturer | Create course. **`lecturerId` is always the caller’s user id.** An admin who creates a course becomes that course’s lecturer. |
| `GET` | `/api/courses` | Any user | Scoped list + lecturer info + enrollment/session counts |
| `GET` | `/api/courses/:id` | Any user with access | Details + enrollments (students must be enrolled) |
| `POST` | `/api/courses/:id/enrollments` | Admin, owning lecturer | Enroll by `studentId` **or** `matricNumber`, plus `academicSession` (e.g. `2024/2025`) |

Create body example:

```json
{
  "courseCode": "CSC 401",
  "title": "Software Engineering",
  "unitLoad": 3
}
```

Enroll body example:

```json
{
  "matricNumber": "CS/2021/001",
  "academicSession": "2024/2025"
}
```

Students cannot enroll themselves.

---

## 8. Attendance lifecycle (end-to-end)

### 8.1 Lecturer opens a session

`POST /api/sessions` — Admin or lecturer.

```json
{ "courseId": 1, "ttlSeconds": 120 }
```

- `ttlSeconds` is optional; minimum **30**, default **120**.
- Server generates a new `qrToken` and `tokenExpiry = now + ttl`.
- Status starts as `OPEN`.
- Audit: `OPEN_SESSION`.

The frontend should encode `qrToken` (or a URL containing it) as a QR image and display it in class. The backend does **not** generate the QR image; it only stores the token.

### 8.2 Rotating the QR (anti-screenshot / replay)

`POST /api/sessions/:id/refresh-qr`

- Allowed only while the session is `OPEN`.
- Issues a **new** token and resets expiry to **120 seconds** (hardcoded in the service; the HTTP handler does not accept a custom TTL).
- The previous token immediately stops working (`findUnique` on `qrToken`).

A typical lecturer UI polls this endpoint so the displayed QR changes every couple of minutes.

### 8.3 Student marks attendance

The student must already be logged in. They scan the QR and send the token back.

**Shared validation** (`prepareMarking`) for both PIN and fingerprint:

1. Actor must be a student with a `Student` row.
2. Session found by `qrToken` — else `Invalid QR code`.
3. Session `status === OPEN` — else `Attendance session is closed`.
4. `tokenExpiry` still in the future — else `QR code has expired`.
5. Enrollment exists for `(courseId, studentId)` — else `You are not enrolled in this course`.
6. No existing `AttendanceRecord` for that pair — else `Attendance already marked`.

### 8.4 Path A — fingerprint (WebAuthn)

**One-time enrollment** (before class, typically):

1. `POST /api/webauthn/register/options`  
   Server builds registration options:
   - Platform authenticator (`authenticatorAttachment: 'platform'`).
   - `userVerification: 'required'` (fingerprint / Windows Hello / etc.).
   - Existing credentials are excluded so the same authenticator is not registered twice.
   - Challenge stored for 5 minutes.
2. Browser/OS prompts for fingerprint; client posts the credential.
3. `POST /api/webauthn/register/verify` with `{ "credential": { ... } }`  
   Server verifies origin + RP ID, stores public key and sign counter.

**During class:**

1. `POST /api/attendance/mark/fingerprint/options` with `{ "qrToken": "..." }`  
   - Runs `prepareMarking`.  
   - Rejects if 3+ biometric failures this session (`Fingerprint locked... Use PIN`).  
   - Rejects if no enrolled credential.  
   - Returns authentication options; stores an `authentication` challenge tied to `sessionId`.
2. Client signs the challenge with the device authenticator.
3. `POST /api/attendance/mark/fingerprint/verify` with `{ "qrToken", "credential" }`  
   - Re-runs `prepareMarking` (token may have expired in the meantime).  
   - Loads stored credential; unknown id increments fail count.  
   - Verifies WebAuthn assertion; on failure increments fail count.  
   - On success, updates `signCount` and creates a record with `QR_FINGERPRINT`.

### 8.5 Path B — PIN

`POST /api/attendance/mark/pin`

```json
{ "qrToken": "...", "pin": "1234" }
```

- Student must have `pinHash`.
- PIN is verified with Argon2.
- Invalid PIN → `401 Unauthorized` (fail count for biometrics is **not** incremented).
- Success → record with `QR_PIN`.

PIN is the recovery path after biometric lockout.

### 8.6 Lecturer closes the session

`POST /api/sessions/:id/close`

Sets `status = CLOSED`. Further scans fail even if the QR is still on screen. Audit: `CLOSE_SESSION`.

### 8.7 Inspecting a session

| Method | Path | Roles | Description |
| --- | --- | --- | --- |
| `GET` | `/api/sessions/:id` | Admin / owning lecturer | Session + course + records (student name/email) |
| `GET` | `/api/courses/:id/sessions` | Admin / owning lecturer | Sessions for a course, newest first, with record counts |

Students **cannot** list sessions via these endpoints.

---

## 9. Flow diagram

```
Admin creates lecturer + students
        │
        ▼
Lecturer creates course  ──►  Lecturer enrolls students
        │
        ▼
Lecturer POST /sessions  ──►  QR token (ttl ~ 2 min)
        │                         │
        │                         ├─► Lecturer may POST /sessions/:id/refresh-qr
        │                         │
        │                         ▼
        │                   Student scans QR (logged in)
        │                         │
        │              ┌──────────┴──────────┐
        │              ▼                     ▼
        │     Fingerprint WebAuthn        PIN fallback
        │     (max 3 fails / session)     (if PIN registered)
        │              │                     │
        │              └──────────┬──────────┘
        │                         ▼
        │              AttendanceRecord PRESENT
        │              (unique per session+student)
        │
        ▼
Lecturer POST /sessions/:id/close
        │
        ▼
GET /api/reports/courses/:id   or   GET /api/reports/me
```

---

## 10. Reports

Threshold comes from `ATTENDANCE_THRESHOLD` (default 75).

**Lecturer / admin — course report**  
`GET /api/reports/courses/:id`

For each enrolled student:

- `present` = number of attendance records for sessions of this course.
- `sessionCount` = **all** sessions of the course (`OPEN` and `CLOSED`).
- `percentage` = `round(present / sessionCount * 1000) / 10` (one decimal).
- `belowThreshold` = `percentage < threshold`.

If there are zero sessions, percentage is `0`.

**Student — personal report**  
`GET /api/reports/me`

Same formula, one row per enrolled course.

There is no CSV/PDF export in the API; clients can render these JSON payloads.

---

## 11. Complete HTTP catalogue

Base URL: `http://localhost:<PORT>/<API_PREFIX>` (default `http://localhost:3000/api`).

Success envelope used by most module controllers:

```json
{
  "status": "success",
  "statusCode": 200,
  "message": "...",
  "data": {}
}
```

Health checks (`AppController`) return a slightly different shape (`success`, `message` / `status`).

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api` | Public | Welcome |
| `GET` | `/api/health` | Public | Health |
| `POST` | `/api/auth/login` | Public | Login |
| `GET` | `/api/auth/me` | JWT | Current user |
| `PATCH` | `/api/auth/change-password` | JWT | Change password |
| `GET` | `/api/users` | Admin | List users |
| `GET` | `/api/users/:id` | Admin | Get user |
| `POST` | `/api/users/lecturers` | Admin | Create lecturer |
| `POST` | `/api/users/students` | Admin | Create student |
| `PATCH` | `/api/users/:id` | Admin | Update user |
| `POST` | `/api/courses` | Admin, lecturer | Create course |
| `GET` | `/api/courses` | JWT | List courses |
| `GET` | `/api/courses/:id` | JWT + access | Course detail |
| `POST` | `/api/courses/:id/enrollments` | Admin, owning lecturer | Enroll student |
| `POST` | `/api/sessions` | Admin, lecturer | Open session |
| `POST` | `/api/sessions/:id/refresh-qr` | Admin, owning lecturer | Rotate QR |
| `POST` | `/api/sessions/:id/close` | Admin, owning lecturer | Close session |
| `GET` | `/api/sessions/:id` | Admin, owning lecturer | Session + records |
| `GET` | `/api/courses/:id/sessions` | Admin, owning lecturer | List sessions |
| `POST` | `/api/attendance/mark/pin` | Student | Mark with PIN |
| `POST` | `/api/webauthn/register/options` | Student | Fingerprint enroll options |
| `POST` | `/api/webauthn/register/verify` | Student | Fingerprint enroll verify |
| `POST` | `/api/attendance/mark/fingerprint/options` | Student | Auth options for a QR |
| `POST` | `/api/attendance/mark/fingerprint/verify` | Student | Verify fingerprint + mark |
| `GET` | `/api/reports/me` | Student | Personal percentages |
| `GET` | `/api/reports/courses/:id` | Admin, owning lecturer | Course percentages |

Swagger (non-production): `http://localhost:3000/docs` (no `/api` prefix). Bearer auth can be persisted in the UI.

---

## 12. Security properties and limits

**What the design tries to prevent**

- **Buddy punching without the student’s device:** fingerprint is a platform authenticator bound to that student account.
- **Reusing a photographed QR:** tokens expire quickly and can be rotated; each token maps to one session row.
- **Double marking:** unique `(sessionId, studentId)`.
- **Outsiders scanning:** must be authenticated and enrolled.
- **Brute-force fingerprint:** three failures lock biometrics for that session.
- **Password leakage in APIs:** hashes omitted from user selects.
- **WebAuthn replay:** challenges are single-use; authenticator counter is stored.

**What it does not currently do**

- No location / classroom geofence.
- No proof the student is physically looking at the lecturer’s projector (a forwarded live token could still work until expiry).
- No device binding beyond WebAuthn credentials (a student can register additional authenticators).
- `QR_TOKEN_SECRET` is unused.
- Rate limiter is configured but not wired as a guard.
- No “absent” records, no late window, no makeup attendance.
- Course create always assigns the **caller** as lecturer (awkward for admins creating courses for others).
- Login email is not normalized in `AuthService` (repository lowercases the lookup, which is fine if all emails were stored lowercase).

WebAuthn **must** be tested on a matching origin: `WEBAUTHN_RP_ID` / `WEBAUTHN_ORIGIN` have to equal the host the student browser uses. A mismatch causes registration/authentication to fail even with a correct fingerprint.

---

## 13. Seed data

`npm run prisma:seed` runs `prisma/seed.ts` (idempotent upserts).

| Role | Email | Password | Extra |
| --- | --- | --- | --- |
| Admin | `admin@unical.edu.ng` | `Admin123!` | — |
| Lecturer | `jane.lecturer@unical.edu.ng` | `Lecturer123!` | Teaches **CSC 401** Software Engineering (3 units) |
| Student | `john.student@unical.edu.ng` | `Student123!` | Matric `CS/2021/001`, dept Computer Science, PIN `1234`, enrolled 2024/2025 |

Use these only in local/dev environments.

---

## 14. Local development

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
npm run start:dev
```

Useful scripts from `package.json`:

| Script | Action |
| --- | --- |
| `start:dev` | Watch mode |
| `prisma:generate` | Generate Prisma Client |
| `prisma:migrate` | Dev migrations |
| `prisma:deploy` | Apply migrations |
| `prisma:reset` | Reset DB |
| `prisma:studio` | GUI for data |
| `prisma:seed` | Seed demo users/course |

Then open `http://localhost:3000/api/health` and `http://localhost:3000/docs`.

---

## 15. Suggested client behaviour

**Lecturer app**

1. Login → list courses → open session.
2. Render `data.qrToken` as a QR code.
3. Refresh QR on an interval slightly shorter than TTL (e.g. every 90–120s).
4. Poll `GET /api/sessions/:id` to show a live present list.
5. Close session when class ends.
6. Open course report for eligibility (75% rule).

**Student app**

1. Login → optionally register fingerprint once (`webauthn/register/*`).
2. Scan QR → try fingerprint mark; on lock or missing credential, collect PIN.
3. Show personal report (`/api/reports/me`) including `belowThreshold`.

WebAuthn calls must run in a **secure context** (HTTPS or `localhost`) on the origin configured in `WEBAUTHN_ORIGIN`.

---

## 16. Source map (attendance product)

| Area | Path |
| --- | --- |
| Bootstrap, CORS, Swagger | `src/main.ts` |
| Module graph | `src/app.module.ts` |
| Env mapping | `src/config/app.config.ts` |
| Schema | `prisma/schema.prisma` |
| Seed | `prisma/seed.ts` |
| DB client | `src/prisma/prisma.service.ts` |
| Auth | `src/modules/auth/` |
| Users | `src/modules/users/` |
| Courses | `src/modules/courses/` |
| Sessions + mark + WebAuthn | `src/modules/attendance/` |
| Reports | `src/modules/reports/` |
| Password hashing | `src/utils/password.util.ts` |
| API envelope | `src/utils/response.utils.ts` |

This is the behaviour of the attendance backend as implemented today. Frontends should treat the QR token as an opaque secret, never trust client-side “present” flags, and always persist attendance through the mark endpoints above.
