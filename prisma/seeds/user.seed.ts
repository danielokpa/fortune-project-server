import * as argon2 from 'argon2';

import {
  PrismaClient,
  Role,
} from '@prisma/client';

export async function seedAdminUser(
  prisma: PrismaClient,
  organizationId: string,
) {
  const email =
    process.env.SEED_ADMIN_EMAIL!;

  const password =
    process.env.SEED_ADMIN_PASSWORD!;

  const existingUser =
    await prisma.user.findUnique({
      where: {
        email,
      },
    });

  if (existingUser) {
    console.log(
      '✅ Admin already exists:',
      existingUser.email,
    );

    return existingUser;
  }

  const hashedPassword =
    await argon2.hash(
      password,
    );

  const user =
    await prisma.user.create({
      data: {
        email,

        password: hashedPassword,

        firstName: 'System',

        lastName: 'Administrator',

        role: Role.SUPER_ADMIN,

        organizationId,
      },
    });

  console.log(
    '✅ Admin seeded:',
    user.email,
  );

  return user;
}