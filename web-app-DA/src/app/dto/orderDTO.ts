import {categoryDTO} from "./categoryDTO";
import {productDTO} from "./ProductDTO";

export class orderDTO {
  id:number;
  fullname:string;
  address:string;
  sdt:string;
  product: productDTO[];
  status:boolean;


}
