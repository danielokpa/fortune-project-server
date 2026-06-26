"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const organisation_seed_1 = require("./seeds/organisation.seed");
const user_seed_1 = require("./seeds/user.seed");
const jobs_seed_1 = require("./seeds/jobs.seed");
const questions_seed_1 = require("./seeds/questions.seed");
const assessment_seed_1 = require("./seeds/assessment.seed");
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new client_1.PrismaClient({
    adapter,
});
async function main() {
    console.log('\n🚀 Starting seed...\n');
    const organization = await (0, organisation_seed_1.seedOrganization)(prisma);
    const admin = await (0, user_seed_1.seedAdminUser)(prisma, organization.id);
    await (0, jobs_seed_1.seedJobs)(prisma);
    await (0, questions_seed_1.seedQuestionBank)(prisma);
    await (0, assessment_seed_1.seedAssessments)(prisma);
    console.log('\n');
    console.log('Organization ID:', organization.id);
    console.log('Admin User ID:', admin.id);
    console.log('\n✅ Base seed complete\n');
}
main()
    .catch(console.error)
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map