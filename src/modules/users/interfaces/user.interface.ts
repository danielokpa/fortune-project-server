import { Role } from '@prisma/client';

export interface UserFilters {
  cursor?: string;
  limit: number;
  search?: string;
  role?: Role;
}

export type SafeUser = {
  id: number;
  fullName: string;
  email: string;
  role: Role;
  createdAt: Date;
};
