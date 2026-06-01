import { Injectable, NotFoundException } from '@nestjs/common';
import { Country, Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';

@Injectable()
export class CountryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Country | null> {
    try {
      const country = await this.prisma.country.findUnique({
        where: { id },
      });
      return country;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findByName(name: string): Promise<Country | null> {
    try {
      const country = await this.prisma.country.findFirst({
        where: { name },
      });
      return country;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findAll(options?: Prisma.CountryFindManyArgs): Promise<Country[]> {
    try {
      const countries = await this.prisma.country.findMany(options);
      return countries;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async create(countryData: Prisma.CountryCreateInput): Promise<Country> {
    try {
      const country = await this.prisma.country.create({
        data: countryData,
      });
      return country;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async update(
    id: string,
    countryData: Prisma.CountryUpdateInput,
  ): Promise<Country> {
    try {
      const existingCountry = await this.prisma.country.findUnique({
        where: { id },
      });

      if (!existingCountry) {
        throw new NotFoundException('Country not found');
      }

      const updatedCountry = await this.prisma.country.update({
        where: { id },
        data: countryData,
      });

      return updatedCountry;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const existingCountry = await this.prisma.country.findUnique({
        where: { id },
      });

      if (!existingCountry) {
        throw new NotFoundException('Country not found');
      }

      await this.prisma.country.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}
