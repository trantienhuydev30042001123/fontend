import {productDTO} from "./ProductDTO";

export class cartDTO {
  id:number;
  product: productDTO[];
  nameP:string;
  imageP:string;
  priceP : number;
  discountP:number;
  quantity:number;
  totalMoney: number;


  constructor(id: number, product: productDTO[], nameP: string, imageP: string, priceP: number, discountP: number, quantity: number, totalMoney: number) {
    this.id = id;
    this.product = product;
    this.nameP = nameP;
    this.imageP = imageP;
    this.priceP = priceP;
    this.discountP = discountP;
    this.quantity = quantity;
    this.totalMoney = totalMoney;
  }
}
