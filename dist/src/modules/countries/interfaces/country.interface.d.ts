export interface ICreateCountry {
    name: string;
    isoCode: string;
    phoneCode: string;
    phoneLength: number;
    currency: string;
}
export interface IUpdateCountry {
    name?: string;
    isoCode?: string;
    phoneCode?: string;
    phoneLength?: number;
    currency?: string;
    flag?: string | null;
}
