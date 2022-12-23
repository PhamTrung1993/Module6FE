import {Role} from "./role";

export interface User {
  id?: number;
  username?: string;
  password?: string;
  fullName?: string;
  avatar?: string;
  userAddress?: string;
  email?: string;
  phoneNumber?: string;
  roles?: [Role];
}
