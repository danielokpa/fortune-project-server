"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedOrganization = seedOrganization;
async function seedOrganization(prisma) {
    const existingOrganization = await prisma.organization.findFirst({
        where: {
            name: 'PeppCruise',
        },
    });
    if (existingOrganization) {
        console.log('✅ Organization already exists:', existingOrganization.name);
        return existingOrganization;
    }
    const organization = await prisma.organization.create({
        data: {
            name: 'PeppCruise',
        },
    });
    console.log('✅ Organization seeded:', organization.name);
    return organization;
}
//# sourceMappingURL=organisation.seed.js.map