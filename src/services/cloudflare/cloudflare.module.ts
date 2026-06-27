import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

import { CloudflareService } from './cloudflare.service';
import { R2_CLIENT } from './cloudflare.constants';

@Global()
@Module({
  imports: [ConfigModule],

  providers: [
    {
      provide: R2_CLIENT,

      inject: [ConfigService],

      useFactory: (config: ConfigService) => {
        return new S3Client({
          region: 'auto',

          endpoint: config.get<string>('app.r2EndPoint')!,

          credentials: {
            accessKeyId: config.get<string>('app.r2AccessKey')!,
            secretAccessKey: config.get<string>('app.r2SecretKey')!,
          },
        });
      },
    },

    CloudflareService,
  ],

  exports: [CloudflareService],
})
export class CloudflareModule {}