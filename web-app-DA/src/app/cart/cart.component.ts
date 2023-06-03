import {Component, DoCheck, OnInit} from '@angular/core';
import {TokenService} from "../service/token.service";
import {Router} from "@angular/router";
import {HelperService} from "../service/helper-service";
import {cartDTO} from "../dto/cartDTO";
import {productDTO} from "../dto/ProductDTO";
import {DialogConfirmComponent} from "../dialog-confirm/dialog-confirm.component";
import {DialogConfirm} from "../dialog-confirm/interfaces/DialogConfirm";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
  ],
})
export class CartComponent implements OnInit {
  cart: cartDTO[] = [];
  product: productDTO[];
  p: number = 1;
  totalMoney: number;
  idC: number[];
  idP: number[];
  products: any[];


  ngOnInit(): void {
    this.getListCart();
  }

  constructor(private tokenService: TokenService,
              private router: Router,
              private helperService: HelperService,
              private dialog: MatDialog,
  ) {
  }

  // ngDoCheck(): void {
  //   this.getListCart();
  // }
  public getListCart(): void {
    this.helperService
      .getAll(
        "cart"
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

          let id: number[] = [];
          let carts2 = this.products;
          carts2.forEach((item: any) => {
            id.push(item.id);
          })
          this.idP = id;
          console.log(this.idP)
        }
        let id: number[] = [];
        let carts3 = res;
        carts3.forEach((item: any) => {
          id.push(item.id);
        })
        this.idC = id;
        console.log(this.idC)
      })
      .catch((error) => {
        console.log("loi")
      })
  }

  public deleteCart(id: number): void {
    let ids: string[] = [];
    ids.push(String(id));
    this.dialog.open(DialogConfirmComponent, {
      data: new DialogConfirm("Xóa loại sản phẩm ", "Bạn có chắc chắn xóa loại sản phẩm ?", "warn"),
      disableClose: false,
      width: '350x'
    }).afterClosed().subscribe(result => {
      if (result === "Yes") {
        this.helperService
          .deleteById("cart", ids)
          .then(() => {
            let mess = "Xoá Thành Công!";
            this.getListCart();
          })
          .catch((error) => {
            console.log(error)
          })
      }
    });
  }

  buyProduct() {
    this.router.navigate(['buy-product'],{
      queryParams: {data:this.idP,data1:this.idC}
    })
  }
}
