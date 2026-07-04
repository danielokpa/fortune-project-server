import { BadRequestException } from '@nestjs/common';

export interface CursorPayload {
  id: string;
  createdAt: string;
}

export class CursorUtil {
  static encode(payload: CursorPayload): string {
    return Buffer.from(JSON.stringify(payload)).toString('base64');
  }

  static decode(cursor?: string): CursorPayload | null {
    if (!cursor) return null;

    try {
      const decoded = JSON.parse(Buffer.from(cursor, 'base64').toString()) as CursorPayload;
      if (!decoded.createdAt || !decoded.id) {
        throw new Error();
      }
      return decoded;
    } catch {
      throw new BadRequestException('Invalid pagination cursor.');
    }
  }
}
