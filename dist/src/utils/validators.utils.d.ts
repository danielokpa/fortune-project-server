import { UserLoginIdentityType } from "../enums";
export declare class Validators {
    static validateEmail(email: string): string;
    static getLoginIdentity(identity: string): UserLoginIdentityType.PHONE_NO | UserLoginIdentityType.EMAIL;
    static validateUuid(value: string): string;
}
