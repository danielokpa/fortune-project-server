import { State, Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
export declare class StateRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<State | null>;
    findByCountryId(countryId: string): Promise<State[]>;
    findAll(options?: any): Promise<State[]>;
    create(stateData: Prisma.StateCreateInput): Promise<State>;
    update(id: string, stateData: Prisma.StateUpdateInput): Promise<State>;
    delete(id: string): Promise<boolean>;
}
