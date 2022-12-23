import {User} from "./user";
import {House} from "./house";
import {OrderStatus} from "./order-status";

export interface Order {
  id?: number;
  user?: User;
  house?: House;
  status?: OrderStatus;
  startTime?: any;
  endTime?: any;
  createTime?: any;
  income?: number;
}
