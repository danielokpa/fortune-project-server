import { Country, Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
export declare class CountryRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<Country | null>;
    findByName(name: string): Promise<Country | null>;
    findAll(options?: Prisma.CountryFindManyArgs): Promise<Country[]>;
    create(countryData: Prisma.CountryCreateInput): Promise<Country>;
    update(id: string, countryData: Prisma.CountryUpdateInput): Promise<Country>;
    delete(id: string): Promise<boolean>;
}
