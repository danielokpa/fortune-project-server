"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorUtil = void 0;
class CursorUtil {
    static encode(payload) {
        return Buffer.from(JSON.stringify(payload)).toString('base64');
    }
    static decode(cursor) {
        if (!cursor)
            return null;
        try {
            return JSON.parse(Buffer.from(cursor, 'base64').toString());
        }
        catch {
            return null;
        }
    }
}
exports.CursorUtil = CursorUtil;
//# sourceMappingURL=cursor.util.js.map