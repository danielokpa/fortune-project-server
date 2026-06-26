// import {
//   Injectable,
//   NotFoundException,
//   BadRequestException,
// } from '@nestjs/common';

// import { Country, Prisma } from '@prisma/client';

// import { CountryRepository } from '../repositories/country.repository';

// import {
//   ICreateCountry,
//   IUpdateCountry,
// } from '../interfaces/country.interface';

// @Injectable()
// export class CountryService {
//   constructor(private readonly countryRepository: CountryRepository) {}

//   async findById(id: string): Promise<Country> {
//     const country = await this.countryRepository.findById(id);

//     if (!country) {
//       throw new NotFoundException('Country not found');
//     }

//     return country;
//   }

//   async findByName(name: string): Promise<Country> {
//     const country = await this.countryRepository.findByName(name);

//     if (!country) {
//       throw new NotFoundException('Country not found');
//     }

//     return country;
//   }

//   async findAll(params?: Prisma.CountryFindManyArgs): Promise<Country[]> {
//     return this.countryRepository.findAll(params);
//   }

//   async create(countryData: ICreateCountry): Promise<Country> {
//     const country = await this.countryRepository.create(countryData);

//     if (!country) {
//       throw new BadRequestException('Failed to create country');
//     }

//     return country;
//   }

//   async update(id: string, countryData: IUpdateCountry): Promise<Country> {
//     const updatedCountry = await this.countryRepository.update(id, countryData);

//     if (!updatedCountry) {
//       throw new NotFoundException('Country not found for update');
//     }

//     return updatedCountry;
//   }

//   async delete(id: string): Promise<boolean> {
//     const deleted = await this.countryRepository.delete(id);

//     if (!deleted) {
//       throw new BadRequestException('Failed to delete country');
//     }

//     return deleted;
//   }
// }
