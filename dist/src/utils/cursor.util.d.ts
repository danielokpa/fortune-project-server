export interface CursorPayload {
    id: string;
    createdAt: string;
}
export declare class CursorUtil {
    static encode(payload: CursorPayload): string;
    static decode(cursor?: string): CursorPayload | null;
}
