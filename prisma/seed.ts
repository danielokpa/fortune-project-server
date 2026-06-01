import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

import { seedCountries } from './seeds/countries.seed';
import { seedStates } from './seeds/states.seed';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await seedCountries(prisma);
  await seedStates(prisma);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

