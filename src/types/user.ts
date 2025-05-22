import { IResponse } from "./response";

export interface Ilogin {
  email: string;
  password: string;
}

export interface Users {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface IAdminData {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface IGetProfileResponseData extends IResponse {
  data: {
    admin: IAdminData;
  };
}

export interface IListUserResponseData extends IResponse {
  data: {
    items: Users;
  };
}
