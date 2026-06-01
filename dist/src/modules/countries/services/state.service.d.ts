import { Prisma, State } from '@prisma/client';
import { StateRepository } from '../repositories/state.repository';
export declare class StateService {
    private readonly stateRepository;
    constructor(stateRepository: StateRepository);
    findById(id: string): Promise<State>;
    findByCountryId(countryId: string): Promise<State[]>;
    findAll(params?: Prisma.StateFindManyArgs): Promise<State[]>;
    create(stateData: Prisma.StateCreateInput): Promise<State>;
    update(id: string, stateData: Prisma.StateUpdateInput): Promise<State>;
    delete(id: string): Promise<boolean>;
}
