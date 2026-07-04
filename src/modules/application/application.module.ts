import { Module } from '@nestjs/common';
import { ApplicationRepository } from './repositories/application.repository';
import { ApplicationService } from './services/application.service';
import { ApplicationController } from './controllers/application.controller';

@Module({
  providers: [ApplicationRepository, ApplicationService],
  controllers: [ApplicationController],
  exports: [ApplicationRepository],
})
export class ApplicationModule {}