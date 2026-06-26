"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDatabaseError = handleDatabaseError;
const client_1 = require("@prisma/client");
const common_1 = require("@nestjs/common");
function handleDatabaseError(error) {
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                throw new common_1.ConflictException('Duplicate field value detected');
            case 'P2025':
                throw new common_1.NotFoundException('Record not found');
            default:
                throw new common_1.InternalServerErrorException(`Database operation failed: ${error.code} \n ${error.message}`);
        }
    }
    if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        throw new common_1.InternalServerErrorException('Invalid database query');
    }
    if (error instanceof Error) {
        throw new common_1.InternalServerErrorException(error.message);
    }
    throw new common_1.InternalServerErrorException('Unexpected database error');
}
//# sourceMappingURL=db-error-handler.util.js.map