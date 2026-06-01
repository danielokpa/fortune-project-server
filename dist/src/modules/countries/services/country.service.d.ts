import { Country, Prisma } from '@prisma/client';
import { CountryRepository } from '../repositories/country.repository';
import { ICreateCountry, IUpdateCountry } from '../interfaces/country.interface';
export declare class CountryService {
    private readonly countryRepository;
    constructor(countryRepository: CountryRepository);
    findById(id: string): Promise<Country>;
    findByName(name: string): Promise<Country>;
    findAll(params?: Prisma.CountryFindManyArgs): Promise<Country[]>;
    create(countryData: ICreateCountry): Promise<Country>;
    update(id: string, countryData: IUpdateCountry): Promise<Country>;
    delete(id: string): Promise<boolean>;
}
