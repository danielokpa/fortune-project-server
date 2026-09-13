import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  apiPrefix: process.env.API_PREFIX || 'api',
  corsOrigin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
    : ['http://localhost:3000', 'http://localhost:5173'],
  jwtSecret: process.env.JWT_SECRET || 'attendance-dev-jwt-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  qrTokenSecret:
    process.env.QR_TOKEN_SECRET ||
    process.env.JWT_SECRET ||
    'attendance-dev-qr-secret-change-me',
  attendanceThreshold: parseInt(process.env.ATTENDANCE_THRESHOLD || '75', 10),
  webauthnRpId: process.env.WEBAUTHN_RP_ID || 'localhost',
  webauthnOrigin: process.env.WEBAUTHN_ORIGIN || 'http://localhost:3000',
  webauthnRpName:
    process.env.WEBAUTHN_RP_NAME || 'UNICAL QR Attendance',
  rateLimitTtl: parseInt(process.env.RATE_LIMIT_TTL || '60000', 10),
  rateLimitLimit: parseInt(process.env.RATE_LIMIT_LIMIT || '60', 10),
}));
