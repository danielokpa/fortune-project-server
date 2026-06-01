import { UserLoginIdentityType } from "../enums";
export declare class Utils {
    static getLoginIdentityType(identity: string): UserLoginIdentityType.PHONE_NO | UserLoginIdentityType.EMAIL;
    static normalizeCountryPhone(countryCode: string, phoneNo: string, phoneNoLength: number): string;
    static phoneSMSFormat(phone: string): string;
}
