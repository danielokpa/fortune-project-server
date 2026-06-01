"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const countries_seed_1 = require("./seeds/countries.seed");
const states_seed_1 = require("./seeds/states.seed");
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new client_1.PrismaClient({
    adapter,
});
async function main() {
    await (0, countries_seed_1.seedCountries)(prisma);
    await (0, states_seed_1.seedStates)(prisma);
}
main()
    .catch(console.error)
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map