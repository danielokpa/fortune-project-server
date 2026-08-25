# Smart Remote Patient Health Monitoring System
## Backend Architecture — NestJS + Prisma + PostgreSQL

---

## 1. Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (v20+) |
| Framework | NestJS |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | JWT (access token) + bcrypt |
| Validation | class-validator + class-transformer |
| Environment | @nestjs/config |

---

## 2. Project Structure

```
src/
├── app.module.ts
├── main.ts
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   └── decorators/
│       └── roles.decorator.ts
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   └── users.service.ts
├── patients/
│   ├── patients.module.ts
│   ├── patients.controller.ts
│   └── patients.service.ts
├── devices/
│   ├── devices.module.ts
│   ├── devices.controller.ts
│   └── devices.service.ts
├── readings/
│   ├── readings.module.ts
│   ├── readings.controller.ts
│   └── readings.service.ts
├── alerts/
│   ├── alerts.module.ts
│   ├── alerts.controller.ts
│   └── alerts.service.ts
└── thresholds/
    ├── thresholds.module.ts
    ├── thresholds.controller.ts
    └── thresholds.service.ts
```

---

## 3. Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  DOCTOR
  NURSE
}

enum AlertStatus {
  ACTIVE
  RESOLVED
}

enum DeviceStatus {
  ACTIVE
  INACTIVE
}

model User {
  id         String   @id @default(uuid())
  name       String
  email      String   @unique
  password   String
  role       Role     @default(NURSE)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("users")
}

model Patient {
  id          String    @id @default(uuid())
  name        String
  dateOfBirth DateTime
  gender      String
  contact     String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  readings    HealthReading[]
  alerts      Alert[]
  thresholds  Threshold[]

  @@map("patients")
}

model Device {
  id         String       @id @default(uuid())
  deviceName String
  status     DeviceStatus @default(ACTIVE)
  createdAt  DateTime     @default(now())

  readings   HealthReading[]

  @@map("devices")
}

model HealthReading {
  id          String   @id @default(uuid())
  patientId   String
  deviceId    String
  heartRate   Float
  temperature Float
  recordedAt  DateTime @default(now())

  patient     Patient  @relation(fields: [patientId], references: [id])
  device      Device   @relation(fields: [deviceId], references: [id])
  alerts      Alert[]

  @@map("health_readings")
}

model Alert {
  id         String      @id @default(uuid())
  patientId  String
  readingId  String
  parameter  String      // e.g. "heart_rate" or "temperature"
  value      Float
  status     AlertStatus @default(ACTIVE)
  createdAt  DateTime    @default(now())

  patient    Patient       @relation(fields: [patientId], references: [id])
  reading    HealthReading @relation(fields: [readingId], references: [id])

  @@map("alerts")
}

model Threshold {
  id          String  @id @default(uuid())
  patientId   String  @unique
  minHeartRate   Float @default(60)
  maxHeartRate   Float @default(100)
  minTemperature Float @default(36.1)
  maxTemperature Float @default(37.5)

  patient     Patient @relation(fields: [patientId], references: [id])

  @@map("thresholds")
}
```

---

## 4. Modules, Responsibilities & APIs

### 4.1 Auth Module

**Responsibility:** Register users, log in, issue JWT tokens, protect routes.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | None | Register a new user |
| POST | `/auth/login` | None | Login and receive JWT |

**DTOs:**
```ts
// register.dto.ts
{ name, email, password, role }

// login.dto.ts
{ email, password }
```

**Response (login):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1...",
  "user": { "id", "name", "email", "role" }
}
```

---

### 4.2 Users Module

**Responsibility:** Manage system users (admin-only).

| Method | Endpoint | Auth | Roles | Description |
|---|---|---|---|---|
| GET | `/users` | JWT | ADMIN | List all users |
| GET | `/users/me` | JWT | Get current logged-in user |
| GET | `/users/:id` | JWT | ADMIN | Get user by ID |
| PATCH | `/users/:id` | JWT | ADMIN | Update user details |
| DELETE | `/users/:id` | JWT | ADMIN | Delete a user |

---

### 4.3 Patients Module

**Responsibility:** Register and manage patient profiles.

| Method | Endpoint | Auth | Roles | Description |
|---|---|---|---|---|
| POST | `/patients` | JWT | ADMIN, DOCTOR | Register a new patient |
| GET | `/patients` | JWT | All | List all patients |
| GET | `/patients/:id` | JWT | All | Get a patient's profile |
| PATCH | `/patients/:id` | JWT | ADMIN, DOCTOR | Update patient info |
| DELETE | `/patients/:id` | JWT | ADMIN | Remove a patient |
| GET | `/patients/:id/summary` | JWT | All | Patient with latest reading + active alerts |

**DTOs:**
```ts
// create-patient.dto.ts
{ name, dateOfBirth, gender, contact }
```

---

### 4.4 Devices Module

**Responsibility:** Register and manage IoT (simulated) devices.

| Method | Endpoint | Auth | Roles | Description |
|---|---|---|---|---|
| POST | `/devices` | JWT | ADMIN | Register a new device |
| GET | `/devices` | JWT | All | List all devices |
| GET | `/devices/:id` | JWT | All | Get a device |
| PATCH | `/devices/:id` | JWT | ADMIN | Update device status |
| DELETE | `/devices/:id` | JWT | ADMIN | Remove a device |

**DTOs:**
```ts
// create-device.dto.ts
{ deviceName }
```

---

### 4.5 Readings Module

**Responsibility:** Receive incoming vital-sign data (from IoT or simulator), validate it, persist it, and trigger alert evaluation.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/readings` | JWT | Submit a new health reading |
| GET | `/readings` | JWT | List all readings (supports `?patientId=`) |
| GET | `/readings/:id` | JWT | Get a single reading |
| GET | `/readings/patient/:patientId` | JWT | All readings for a patient |

**DTOs:**
```ts
// create-reading.dto.ts
{ patientId, deviceId, heartRate, temperature }
```

**Core logic in `readings.service.ts`:**
```
1. Validate that patientId and deviceId exist.
2. Save the reading.
3. Check against the patient's threshold (or global defaults if no custom threshold).
4. If heartRate or temperature is out of range → create an Alert record.
5. Return the saved reading.
```

---

### 4.6 Alerts Module

**Responsibility:** Store, retrieve, and manage threshold-breach alerts.

| Method | Endpoint | Auth | Roles | Description |
|---|---|---|---|---|
| GET | `/alerts` | JWT | All | List all alerts (supports `?patientId=&status=`) |
| GET | `/alerts/:id` | JWT | All | Get a single alert |
| PATCH | `/alerts/:id/resolve` | JWT | DOCTOR, ADMIN | Mark alert as RESOLVED |

No POST here — alerts are created automatically by the Readings service.

---

### 4.7 Thresholds Module

**Responsibility:** Allow per-patient configuration of normal vital-sign ranges.

| Method | Endpoint | Auth | Roles | Description |
|---|---|---|---|---|
| POST | `/thresholds` | JWT | ADMIN, DOCTOR | Create threshold for a patient |
| GET | `/thresholds/:patientId` | JWT | All | Get threshold for a patient |
| PATCH | `/thresholds/:patientId` | JWT | ADMIN, DOCTOR | Update threshold values |

**DTOs:**
```ts
// create-threshold.dto.ts
{ patientId, minHeartRate, maxHeartRate, minTemperature, maxTemperature }
```

**Default values (used when no custom threshold exists):**
```
Heart Rate:   60 – 100 bpm
Temperature:  36.1 – 37.5 °C
```

---

## 5. Auth & RBAC Summary

**Guards used on every protected route:**
- `JwtAuthGuard` — verifies the Bearer token
- `RolesGuard` — checks the user's role against the `@Roles()` decorator

**Role permissions at a glance:**

| Action | ADMIN | DOCTOR | NURSE |
|---|---|---|---|
| Manage users | ✅ | ❌ | ❌ |
| Register patients | ✅ | ✅ | ❌ |
| View patients & readings | ✅ | ✅ | ✅ |
| Submit readings | ✅ | ✅ | ✅ |
| Resolve alerts | ✅ | ✅ | ❌ |
| Manage devices | ✅ | ❌ | ❌ |
| Configure thresholds | ✅ | ✅ | ❌ |

---

## 6. Global Defaults & Configuration

```env
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/health_monitor"
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="7d"
PORT=3000
```

---

## 7. Key Implementation Notes

### Threshold evaluation in ReadingsService

```ts
async create(dto: CreateReadingDto) {
  // 1. Save the reading
  const reading = await this.prisma.healthReading.create({ data: dto });

  // 2. Get thresholds (custom or defaults)
  const threshold = await this.prisma.threshold.findUnique({
    where: { patientId: dto.patientId },
  }) ?? {
    minHeartRate: 60, maxHeartRate: 100,
    minTemperature: 36.1, maxTemperature: 37.5,
  };

  // 3. Check and create alerts
  const alertsToCreate = [];

  if (dto.heartRate < threshold.minHeartRate || dto.heartRate > threshold.maxHeartRate) {
    alertsToCreate.push({
      patientId: dto.patientId,
      readingId: reading.id,
      parameter: 'heart_rate',
      value: dto.heartRate,
    });
  }

  if (dto.temperature < threshold.minTemperature || dto.temperature > threshold.maxTemperature) {
    alertsToCreate.push({
      patientId: dto.patientId,
      readingId: reading.id,
      parameter: 'temperature',
      value: dto.temperature,
    });
  }

  if (alertsToCreate.length > 0) {
    await this.prisma.alert.createMany({ data: alertsToCreate });
  }

  return reading;
}
```

### Patient Summary endpoint

The `GET /patients/:id/summary` endpoint returns everything the dashboard needs in one call:
```json
{
  "patient": { "id", "name", "gender", "dateOfBirth", "contact" },
  "latestReading": { "heartRate", "temperature", "recordedAt", "device" },
  "activeAlerts": [ { "parameter", "value", "createdAt" } ],
  "threshold": { "minHeartRate", "maxHeartRate", "minTemperature", "maxTemperature" }
}
```

---

## 8. API Summary (All Endpoints)

```
POST   /auth/register
POST   /auth/login
GET    /auth/me

GET    /users
GET    /users/:id
PATCH  /users/:id
DELETE /users/:id

POST   /patients
GET    /patients
GET    /patients/:id
PATCH  /patients/:id
DELETE /patients/:id
GET    /patients/:id/summary

POST   /devices
GET    /devices
GET    /devices/:id
PATCH  /devices/:id
DELETE /devices/:id

POST   /readings
GET    /readings
GET    /readings/:id
GET    /readings/patient/:patientId

GET    /alerts
GET    /alerts/:id
PATCH  /alerts/:id/resolve

POST   /thresholds
GET    /thresholds/:patientId
PATCH  /thresholds/:patientId
```

**Total: 28 endpoints across 6 modules.**
