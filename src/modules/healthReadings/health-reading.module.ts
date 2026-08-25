import { Module } from '@nestjs/common';
import { HealthReadingService } from './services/health-reading.service';
import { HealthReadingRepository } from './repositories/health-reading.repository';
import { HealthReadingController } from './controllers/health-reading.controller';

@Module({
  imports: [],
  controllers: [HealthReadingController],
  providers: [HealthReadingService, HealthReadingRepository],
  exports: [HealthReadingService, HealthReadingRepository],
})
export class HealthReadingsModule {}
