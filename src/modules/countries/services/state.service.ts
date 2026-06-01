import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import {
  Prisma,
  State,
} from '@prisma/client';

import { StateRepository } from '../repositories/state.repository';

@Injectable()
export class StateService {
  constructor(
    private readonly stateRepository: StateRepository,
  ) {}

  async findById(
    id: string,
  ): Promise<State> {
    const state =
      await this.stateRepository.findById(id);

    if (!state) {
      throw new NotFoundException(
        'State not found',
      );
    }

    return state;
  }

  async findByCountryId(
    countryId: string,
  ): Promise<State[]> {
    return this.stateRepository.findByCountryId(
      countryId,
    );
  }

  async findAll(
    params?: Prisma.StateFindManyArgs,
  ): Promise<State[]> {
    return this.stateRepository.findAll(
      params,
    );
  }

  async create(
    stateData: Prisma.StateCreateInput,
  ): Promise<State> {
    const state =
      await this.stateRepository.create(
        stateData,
      );

    if (!state) {
      throw new BadRequestException(
        'Failed to create state',
      );
    }

    return state;
  }

  async update(
    id: string,
    stateData: Prisma.StateUpdateInput,
  ): Promise<State> {
    const updatedState =
      await this.stateRepository.update(
        id,
        stateData,
      );

    if (!updatedState) {
      throw new NotFoundException(
        'State not found for update',
      );
    }

    return updatedState;
  }

  async delete(
    id: string,
  ): Promise<boolean> {
    const deleted =
      await this.stateRepository.delete(id);

    if (!deleted) {
      throw new BadRequestException(
        'Failed to delete state',
      );
    }

    return deleted;
  }
}
