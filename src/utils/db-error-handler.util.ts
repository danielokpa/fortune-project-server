import { Prisma } from '@prisma/client';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export function handleDatabaseError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        throw new ConflictException('Duplicate field value detected');

      case 'P2003':
        throw new ConflictException(
            'Referenced record does not exist.',
        );
      case 'P2025':
        throw new NotFoundException('Record not found');

      default:
        throw new InternalServerErrorException(
          `Database operation failed: ${error.code} \n ${error.message}`,
        );
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new InternalServerErrorException('Invalid database query');
  }

  if (error instanceof Error) {
    throw new InternalServerErrorException(error.message);
  }

  throw new InternalServerErrorException('Unexpected database error');
}
