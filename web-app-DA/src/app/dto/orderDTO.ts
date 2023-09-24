import {categoryDTO} from "./categoryDTO";
import {productDTO} from "./ProductDTO";
import {orderDetailsDTO} from "./orderDetailsDTO";

export class orderDTO {
  id:number;
  fullname:string;
  sizes: number[];
  createdDate:string;
  address:string;
  sdt:string;
  orderDetail: orderDetailsDTO[];
  status:number;
  nameProducts: string[];
  images: string[];
  prices: number[];
  quantity: number[];
  
}
