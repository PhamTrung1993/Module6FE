import {Role} from "./role";

export interface UserToken {
  id?: number;
  username?: string;
  password?: string;
  accessToken?: string;
  fullName?: string;
  avatar?: string;
  userAddress?: string;
  email?: string;
  phoneNumber?: string;
  roles?: [Role];
}
