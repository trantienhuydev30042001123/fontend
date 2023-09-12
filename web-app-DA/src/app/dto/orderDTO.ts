import {categoryDTO} from "./categoryDTO";
import {productDTO} from "./ProductDTO";
import {orderDetailsDTO} from "./orderDetailsDTO";

export class orderDTO {
  id:number;
  fullname:string;
  createDate:string;
  address:string;
  sdt:string;
  orderDetail: orderDetailsDTO[];
  status:number;
  nameProduct: string[];

}
