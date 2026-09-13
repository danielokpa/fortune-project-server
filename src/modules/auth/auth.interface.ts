import { Role } from '@prisma/client';

export interface JwtAuthPayload {
  sub: number;
  email: string;
  userType: Role;
  userId: number;
  iat?: number;
  exp?: number;
}
