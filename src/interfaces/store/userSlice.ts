import { IAuthInputs } from "../../components/AuthModalWindow/AuthModalWindow";
import { TId } from "../global";

export interface IUserFormData extends IAuthInputs { };

export interface IUser {
    blocked: boolean;
    confirmed: boolean;
    createdAt: string;
    email: string;
    id: TId;
    provider: string;
    updatedAt: string;
    username: string;
}

export interface IUserResponse {
    jwt: string;
    user: IUser
}