import { productDTO } from "./ProductDTO";

export class sizeDTO {
  id:number;
  size:number;
  products: productDTO[];


  constructor(id: number, size: number, products: []) {
    this.id = id;
    this.size = size;
    this.products = products;
  }
}
