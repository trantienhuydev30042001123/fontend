export class order{
  fullname:string;
  address:string;
  sdt:string;
  producId:number[];
  totalMoney:number;
  quantity:number[];
  price:number[];
  userId:number;


  constructor(fullname: string, address: string, sdt: string, producId: number[], totalMoney: number, quantity: number[], price: number[], userId: number) {
    this.fullname = fullname;
    this.address = address;
    this.sdt = sdt;
    this.producId = producId;
    this.totalMoney = totalMoney;
    this.quantity = quantity;
    this.price = price;
    this.userId = userId;
  }
}
