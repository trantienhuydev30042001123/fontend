import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {orderDTO} from "../dto/orderDTO";
import {order} from "./interface/order";
import {ActivatedRoute} from "@angular/router";
import {HelperService} from "../service/helper-service";
import {cartDTO} from "../dto/cartDTO";
import {CurrencyPipe} from '@angular/common';
import {CartComponent} from "../cart/cart.component";
import {MatDialog} from '@angular/material/dialog';
import {BuyProductSuccessDialogComponent} from './buy-product-success-dialog/buy-product-success-dialog.component';
import {HttpClient} from '@angular/common/http';
import { NavBarComponent } from '../nav-food/nav-bar/nav-bar.component';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {
  currencyPipe: CurrencyPipe = new CurrencyPipe('en-US');
  abc: number[];
  cart: cartDTO[] = [];
  totalItem: number = 0;
  totalMoney: number;
  products: any[];
  idC: number[];
  sizeP: number[];
  quantity: number[];
  prices: number[];
  userData: any;
  isSuccess: boolean = false;
  order: order = {
    fullname: '',
    address: '',
    sdt: '',
    producId: [],
    totalMoney: 0,
    quantity: [],
    price: [],
    userId: 0,
    size: [],
  };

  navBarComponent : NavBarComponent;


  ngOnInit(): void {
    const userString = localStorage.getItem('ID_Key');
    if (userString) {
      this.userData = JSON.parse(userString);
      this.order.userId = this.userData;
    }
    this.router.queryParams.subscribe((params: any) => {
      this.abc = params.data
      this.idC = params.data1
      this.sizeP = params.data2
      this.order.producId = this.abc;
      this.order.size = this.sizeP;
    });

    this.getListCart();
  }

  constructor(
    private helperService: HelperService,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    // private na : NavBarComponent

  ) {
  }

  public getListCart(): void {
    this.helperService
      .getListCart(
        "cart", this.userData
      )
      .then((res: any) => {
        this.cart = res;
        this.totalItem = res.length;
        if (res) {
          for (let a of res) {
            let quantities: number[] = [];
            let prices: number[] = [];
            if (a.product) {
              const name = a.product;
              a.nameP = name.name;
              const image = a.product;
              a.imageP = image.image;
              const lastPrice = a.product;
              a.priceP = (lastPrice.price - (lastPrice.price * lastPrice.discount / 100)) * a.quantity;
              a.price = (lastPrice.price - (lastPrice.price * lastPrice.discount / 100));
              let carts2 = res;
              carts2.forEach((item: any) => {
                quantities.push(item.quantity);
              })
              let total = 0;
              let carts = res;
              carts.forEach((item: any) => {
                total += item.priceP;
              })
              let carts3 = res;
              carts3.forEach((item: any) => {
                prices.push(item.price);
              })

              this.currencyPipe.transform(total, 'VND', 'symbol', '1.0-0');
              this.totalMoney = total;
              this.order.totalMoney = total;
              this.order.quantity = quantities;
              this.order.price = prices;
              // this.order.size = res.size;
            }
          }
          let products: any[] = [];
          let carts1 = res;
          carts1.forEach((item: any) => {
            products.push(item.product);
          })
          this.products = products
        }
        console.log("respon:" + this.cart);
      })
      .catch((error) => {
        console.log("loi")
      })
  }

  public placeOrder(orderForm: NgForm) {
    this.helperService
      .oder(
        "order/placeOrder", this.order
      )
      .then((res: any) => {
        orderForm.reset();
        this.helperService
          .getListCart(
            "cart",this.userData
          )
        this.dialog.open(BuyProductSuccessDialogComponent,{
          panelClass: 'dialog',
          data: {
            isSuccess : true
          }
        });
        this.totalMoney = 0;
      })
      .catch((error) => {
        console.log("loi")
        this.dialog.open(BuyProductSuccessDialogComponent,{
          panelClass: 'dialog',
          data: {
            isSuccess : false
          }
        });
      })
  }

  public abcd(orderForm: NgForm) {
    this.placeOrder(orderForm);
    this.deleteAllCart();
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

  // public placeOrderSuccess() {
  //   this.http.post("", this.order).subscribe(
  //     (response) => {
  //       // Kiểm tra xem mã trạng thái của phản hồi là 200 (OK)
  //       if (response.status === 200) {
  //         this.isSuccess = true
  //       } else {
  //         this.isSuccess = false
  //       }
  //     },
  //     (error) => {
  //       console.error('Lỗi khi gửi yêu cầu:', error);
  //       this.isSuccess = false
  //     }
  //   );
  //
  //   this.dialog.open(BuyProductSuccessDialogComponent,{
  //     panelClass: 'dialog',
  //     data: {
  //       isSuccess : this.isSuccess
  //     }
  //   });
  // }

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN');
  }
}
