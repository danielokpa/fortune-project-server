import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// import { seedCountries } from './seeds/countries.seed';
// import { seedStates } from './seeds/states.seed';
import {
  seedAdminUser,
} from './seeds/user.seed';
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
  // const patients = await prisma.patient.findMany({ where: { email: null } });

  //   for (const p of patients) {
  //     const syntheticEmail = `${p.firstName}.${p.lastName}.${p.id}@patients.local`.toLowerCase();
  //     await prisma.patient.update({
  //       where: { id: p.id },
  //       data: { email: syntheticEmail },
  //     });
  //     console.log(`✅ Backfilled email for patient ${p.id}: ${syntheticEmail}`);
  //   }
  
  // const admin =
  //   await seedAdminUser(
  //     prisma,
  //   );

  // console.log('\n');

  // console.log(
  //   'Admin User ID:',
  //   admin.id,
  // );

  console.log(
    '\n✅ Base seed complete\n',
  );
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

