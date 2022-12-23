import {User} from "./user";
import {Status} from "./status";
import {Image} from "./Image";


export interface House {
  id?: number;
  houseName?: string;
  houseAddress?: string;
  bedrooms?: number;
  bathrooms?: number;
  rent?: number;
  description?: string;
  user?: User;
  status?: Status;
  image?: Image[];
}
