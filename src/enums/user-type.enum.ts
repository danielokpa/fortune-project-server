import { Role } from '@prisma/client';

export const UserType = Role;
export type UserType = Role;

export enum UserLoginIdentityType {
  PHONE_NO = 'PHONE_NO',
  EMAIL = 'EMAIL',
  USERNAME = 'USERNAME',
}
