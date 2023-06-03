export class order{
  fullname:string;
  address:string;
  sdt:string;
  producId:number[];

  constructor(fullname: string, address: string, sdt: string, producId: number[]) {
    this.fullname = fullname;
    this.address = address;
    this.sdt = sdt;
    this.producId = producId;
  }
}
