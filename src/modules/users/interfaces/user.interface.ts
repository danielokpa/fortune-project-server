import { User } from '@prisma/client';

export interface UserFilters {
  cursor?: string;

  limit: number;

  search?: string;
}

// Omit only the password field
export type SafeUser = Omit<User, 'password'>;
