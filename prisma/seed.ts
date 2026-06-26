import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// import { seedCountries } from './seeds/countries.seed';
// import { seedStates } from './seeds/states.seed';
import {
  seedOrganization,
} from './seeds/organisation.seed';
import {
  seedAdminUser,
} from './seeds/user.seed';
import { seedJobs } from './seeds/jobs.seed';
import { seedQuestionBank } from './seeds/questions.seed';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log(
    '\n🚀 Starting seed...\n',
  );
  // await seedCountries(prisma);
  // await seedStates(prisma);

  const organization =
    await seedOrganization(
      prisma,
    );

  const admin =
    await seedAdminUser(
      prisma,
      organization.id,
    );

  await seedJobs(
    prisma,
  );

  await seedQuestionBank(prisma);

  console.log('\n');

  console.log(
    'Organization ID:',
    organization.id,
  );

  console.log(
    'Admin User ID:',
    admin.id,
  );

  console.log(
    '\n✅ Base seed complete\n',
  );
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

