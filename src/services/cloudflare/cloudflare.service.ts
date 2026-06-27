import { Inject, Injectable } from '@nestjs/common';

import {
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import {
  PresignedUploadOptions,
  PresignedUploadResponse,
} from './cloudflare.interface';

import { ConfigService } from '@nestjs/config';
import { R2_CLIENT } from './cloudflare.constants';

@Injectable()
export class CloudflareService {
  constructor(
    @Inject(R2_CLIENT)
    private readonly r2: S3Client,

    private readonly config: ConfigService,
  ) {}

  async generateUploadUrl(
    options: PresignedUploadOptions,
  ): Promise<PresignedUploadResponse> {
    const expiresIn = options.expiresIn ?? 600;

    const command = new PutObjectCommand({
      Bucket: this.config.get<string>('app.r2Bucket'),

      Key: options.key,

      ContentType: options.contentType,
    });

    const uploadUrl = await getSignedUrl(
      this.r2,
      command,
      {
        expiresIn,
      },
    );

    return {
      key: options.key,
      uploadUrl,
      expiresIn,
    };
  }
}