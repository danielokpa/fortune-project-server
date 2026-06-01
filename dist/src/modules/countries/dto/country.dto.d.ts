export declare class CreateCountryDto {
    name: string;
    isoCode: string;
    phoneCode: string;
    phoneLength: number;
    currency: string;
    flag?: string | null;
}
declare const UpdateCountryDto_base: import("@nestjs/common").Type<Partial<CreateCountryDto>>;
export declare class UpdateCountryDto extends UpdateCountryDto_base {
}
export {};
