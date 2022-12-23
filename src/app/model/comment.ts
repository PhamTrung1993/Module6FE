import {User} from "./user";

export interface Comments {
  id?:number;
  comment?: string;
  houseId?:number;
  user?: User;
  userName?:string;

  isRead?: boolean;

  userId:any;

}
