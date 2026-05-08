"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleOAuthLoginDto = exports.GoogleOAuthLoginDto = exports.AppleOAuthSignUpDto = exports.GoogleOAuthSignUpDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GoogleOAuthSignUpDto {
    idToken;
    email;
    phoneNo;
    otpPhone;
    country;
    fullName;
    referalCode;
}
exports.GoogleOAuthSignUpDto = GoogleOAuthSignUpDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Google ID token (JWT) from Sign-In',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(20),
    __metadata("design:type", String)
], GoogleOAuthSignUpDto.prototype, "idToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Must match the email on the Google token' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(320),
    __metadata("design:type", String)
], GoogleOAuthSignUpDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number (local part); normalized with country',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(15),
    __metadata("design:type", String)
], GoogleOAuthSignUpDto.prototype, "phoneNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(6),
    __metadata("design:type", String)
], GoogleOAuthSignUpDto.prototype, "otpPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Country UUID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GoogleOAuthSignUpDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Full name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(150),
    (0, class_validator_1.Matches)(/^[A-Za-z _'-]+$/, {
        message: 'Only letters, spaces, underscores, apostrophes, and hyphens are allowed in fullName field',
    }),
    __metadata("design:type", String)
], GoogleOAuthSignUpDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], GoogleOAuthSignUpDto.prototype, "referalCode", void 0);
class AppleOAuthSignUpDto {
    identityToken;
    email;
    phoneNo;
    otpPhone;
    country;
    fullName;
    referalCode;
}
exports.AppleOAuthSignUpDto = AppleOAuthSignUpDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Apple identity token (JWT)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(20),
    __metadata("design:type", String)
], AppleOAuthSignUpDto.prototype, "identityToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Optional when email is present on the token (Apple may omit email after first authorization)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(320),
    __metadata("design:type", String)
], AppleOAuthSignUpDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number (local part); normalized with country',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(15),
    __metadata("design:type", String)
], AppleOAuthSignUpDto.prototype, "phoneNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(6),
    __metadata("design:type", String)
], AppleOAuthSignUpDto.prototype, "otpPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Country UUID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AppleOAuthSignUpDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Full name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(150),
    (0, class_validator_1.Matches)(/^[A-Za-z _'-]+$/, {
        message: 'Only letters, spaces, underscores, apostrophes, and hyphens are allowed in fullName field',
    }),
    __metadata("design:type", String)
], AppleOAuthSignUpDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], AppleOAuthSignUpDto.prototype, "referalCode", void 0);
class GoogleOAuthLoginDto {
    idToken;
}
exports.GoogleOAuthLoginDto = GoogleOAuthLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Google ID token (JWT) from Sign-In',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(20),
    __metadata("design:type", String)
], GoogleOAuthLoginDto.prototype, "idToken", void 0);
class AppleOAuthLoginDto {
    identityToken;
    email;
}
exports.AppleOAuthLoginDto = AppleOAuthLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Apple identity token (JWT)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(20),
    __metadata("design:type", String)
], AppleOAuthLoginDto.prototype, "identityToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Optional when email is present on the token (Apple may omit email after first authorization)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(320),
    __metadata("design:type", String)
], AppleOAuthLoginDto.prototype, "email", void 0);
//# sourceMappingURL=oauth.dto.js.map