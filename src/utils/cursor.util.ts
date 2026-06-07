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
      return JSON.parse(Buffer.from(cursor, 'base64').toString());
    } catch {
      return null;
    }
  }
}
