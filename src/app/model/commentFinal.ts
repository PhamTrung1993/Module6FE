import {House} from "./house";
import {User} from "./user";

export interface CommentFinal {
  id?:number;
  comment?: String;
  house? : House;
  user?: User  ;
  isRead?: Boolean;
}
