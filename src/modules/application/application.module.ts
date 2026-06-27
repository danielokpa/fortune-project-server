import { Module } from '@nestjs/common';

import { ApplicationRepository } from './repositories/application.repository';

@Module({
  providers: [ApplicationRepository],
  exports: [ApplicationRepository],
})
export class ApplicationModule {}