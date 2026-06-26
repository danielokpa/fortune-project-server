import { UserType } from "../../enums";
export interface IUserLoginData {
    id: string;
    token: string;
    userType: UserType;
    userId: string;
    email: string;
}
