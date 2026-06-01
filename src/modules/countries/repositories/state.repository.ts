import { Injectable, NotFoundException } from '@nestjs/common';
import { State, Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { handleDatabaseError } from 'src/utils/db-error-handler.util';

@Injectable()
export class StateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<State | null> {
    try {
      const state = await this.prisma.state.findUnique({
        where: { id },
      });
      return state;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findByCountryId(countryId: string): Promise<State[]> {
    try {
      const states = await this.prisma.state.findMany({
        where: { countryId },
        orderBy: {
          name: 'asc',
        }
      });
      return states;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findAll(options?: any): Promise<State[]> {
    try {
      const states = await this.prisma.state.findMany(options);
      return states;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async create(stateData: Prisma.StateCreateInput): Promise<State> {
    try {
      const state = await this.prisma.state.create({
        data: stateData,
      });
      return state;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async update(
    id: string,
    stateData: Prisma.StateUpdateInput,
  ): Promise<State> {
    try {
      const existingState = await this.prisma.state.findUnique({
        where: { id },
      });

      if (!existingState) {
        throw new NotFoundException('State not found');
      }

      const updatedState = await this.prisma.state.update({
        where: { id },
        data: stateData,
      });

      return updatedState;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const existingState = await this.prisma.state.findUnique({
        where: { id },
      });

      if (!existingState) {
        throw new NotFoundException('State not found');
      }

      await this.prisma.state.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}
