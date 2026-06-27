import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CloudflareService } from '../../../services/cloudflare/cloudflare.service';
import { CandidateDocumentType } from '../dto/generate-upload-url.dto';

@Injectable()
export class UploadService {
  constructor(
    private readonly cloudflareService: CloudflareService,
  ) {}

  async generateCandidateUploadUrl(
    documentType: CandidateDocumentType,
    contentType: string,
  ) {
    const uploadId = randomUUID();

    const extension = this.getExtension(contentType);

    const key =
      `candidate-documents/temp/${uploadId}/${documentType}.${extension}`;

    return this.cloudflareService.generateUploadUrl({
      key,
      contentType,
    });
  }

  private getExtension(contentType: string): string {
    switch (contentType) {
      case 'application/pdf':
        return 'pdf';

      case 'image/jpeg':
        return 'jpg';

      case 'image/png':
        return 'png';

      case 'image/webp':
        return 'webp';

      default:
        throw new Error(`Unsupported content type: ${contentType}`);
    }
  }
}