-- CreateEnum
CREATE TYPE "LoginType" AS ENUM ('NORMAL', 'SOCIAL');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DOCTOR', 'NURSE');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('OTP', 'JWT', 'REFRESH');

-- CreateEnum
CREATE TYPE "TokenSubject" AS ENUM ('FORGOT_PASSWORD', 'SIGN_UP_PHONE', 'SIGN_UP_EMAIL', 'NEW_DEVICE_LOGIN_OTP', 'RESET_PASSCODE');

-- CreateEnum
CREATE TYPE "AlertStatus" AS ENUM ('ACTIVE', 'RESOLVED');

-- CreateEnum
CREATE TYPE "DeviceStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "subject" "TokenSubject" NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT,
    "phoneNo" TEXT,
    "tokenType" "TokenType" NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'NURSE',
    "isDisabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devices" (
    "id" TEXT NOT NULL,
    "deviceName" TEXT NOT NULL,
    "status" "DeviceStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_readings" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "heartRate" DOUBLE PRECISION NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "health_readings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alerts" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "readingId" TEXT NOT NULL,
    "parameter" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" "AlertStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thresholds" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "minHeartRate" DOUBLE PRECISION NOT NULL DEFAULT 60,
    "maxHeartRate" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "minTemperature" DOUBLE PRECISION NOT NULL DEFAULT 36.1,
    "maxTemperature" DOUBLE PRECISION NOT NULL DEFAULT 37.5,

    CONSTRAINT "thresholds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tokens_email_idx" ON "tokens"("email");

-- CreateIndex
CREATE INDEX "tokens_phoneNo_idx" ON "tokens"("phoneNo");

-- CreateIndex
CREATE INDEX "tokens_token_idx" ON "tokens"("token");

-- CreateIndex
CREATE INDEX "tokens_expiry_idx" ON "tokens"("expiry");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "thresholds_patientId_key" ON "thresholds"("patientId");

-- AddForeignKey
ALTER TABLE "health_readings" ADD CONSTRAINT "health_readings_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_readings" ADD CONSTRAINT "health_readings_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_readingId_fkey" FOREIGN KEY ("readingId") REFERENCES "health_readings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thresholds" ADD CONSTRAINT "thresholds_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
