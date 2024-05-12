import { IPermission } from "./IPermission";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  permissions?: IPermission[];
}
