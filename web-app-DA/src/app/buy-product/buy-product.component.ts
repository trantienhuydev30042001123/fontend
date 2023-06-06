import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {orderDTO} from "../dto/orderDTO";
import {order} from "./interface/order";
import {ActivatedRoute} from "@angular/router";
import {HelperService} from "../service/helper-service";
import {cartDTO} from "../dto/cartDTO";
import { CurrencyPipe } from '@angular/common';
import {CartComponent} from "../cart/cart.component";

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit{
  currencyPipe: CurrencyPipe = new CurrencyPipe('en-US');
  abc: number[];
  cart: cartDTO[] = [];
  totalMoney: number;
  products: any[];
  idC: number[];
  userData: any;
  order: order = {
    fullname:'',
    address:'',
    sdt:'',
    producId: []
  };
  ngOnInit(): void {
    const userString = localStorage.getItem('ID_Key');
    if (userString) {
      this.userData = JSON.parse(userString);
    }
    this.router.queryParams.subscribe((params: any) => {
      this.abc = params.data
      this.idC = params.data1
      this.order.producId = this.abc;
    });
    this.getListCart();
  }
  constructor(
    private helperService: HelperService,
    private router: ActivatedRoute) {
  }
  public getListCart(): void {
    this.helperService
      .getListCart(
        "cart", this.userData
      )
      .then((res: any) => {
        this.cart = res;
        if (res) {
          for (let a of res) {
            if (a.product) {
              const name = a.product;
              a.nameP = name.name;
              const image = a.product;
              a.imageP = image.image;
              const lastPrice = a.product;
              a.priceP = (lastPrice.price - (lastPrice.price * lastPrice.discount / 100)) * a.quantity;

              let total = 0;
              let carts = res;
              carts.forEach((item: any) => {
                total += item.priceP;
              })
              this.currencyPipe.transform(total, 'VND', 'symbol', '1.0-0');
              this.totalMoney = total;

            }
          }
          let products: any[] = [];
          let carts1 = res;
          carts1.forEach((item: any) => {
            products.push(item.product);
          })
          this.products = products
          console.log(this.products)
        }
      })
      .catch((error) => {
        console.log("loi")
      })
  }
  public placeOrder(orderForm: NgForm){
    this.helperService
      .oder(
        "order/placeOrder", this.order
      )
      .then((res: any) => {
          orderForm.reset();
      })
      .catch((error) => {
        console.log("loi")
      })
  }
  public abcd(orderForm: NgForm){
    this.placeOrder(orderForm);
    this.deleteAllCart()
  }
  public deleteAllCart(): void {
    this.helperService
      .deleteAll("cart", this.idC)
      .then(() => {
        let mess = "Xoá Thành Công!";
        this.getListCart();
      })
      .catch((error) => {
        console.log(error)
      })
  }

}
