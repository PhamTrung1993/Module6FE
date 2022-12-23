import {Image} from "./Image";

export interface HouseDTO {
  id?: number;
  houseName?: string;
  houseAddress?: string;
  bedrooms?: number;
  bathrooms?: number;
  rent?: number;
  description?: string;
  statusId?: number;
  listImage?: string;
  // image2?: string;
  // image3?: string;
}
