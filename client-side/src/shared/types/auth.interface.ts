import { IUser } from "./user.interface";

export interface IAuthForm {
  name: string;
  email: string;
  password: string;
  accessToken: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}
