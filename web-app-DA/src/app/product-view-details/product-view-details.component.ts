import {Component, Inject, OnInit} from '@angular/core';
import {HelperService} from "../service/helper-service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {productDTO} from "../dto/ProductDTO";
import {NavBarComponent} from "../nav-food/nav-bar/nav-bar.component";
import {CartComponent} from "../cart/cart.component";
import {cartDTO} from "../dto/cartDTO";

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit{
  cart :cartDTO[] = [];
  defaults: productDTO;
  singleProduct : any;
  selectedProductIndex = 0;
  selectedProductIndex1 = 1;
  selectedProductIndex2 = 2;
  navBarComponent: NavBarComponent;

  private cartComponent : CartComponent;
  constructor(@Inject(MAT_DIALOG_DATA) public id: string,
    private helperService: HelperService,
              private route: ActivatedRoute,
              private router: Router,
              public dialogRef: MatDialogRef<ProductViewDetailsComponent>,) {
  }
  ngOnInit(): void {
    // this.cartComponent.getListCart()
    this.getProductdetail()
    this.defaults = new productDTO();
    if (this.id ) {
      this.defaults.id = this.id;
    }
  }
  // getProduct(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.helperService.getDetail(id).subscribe(
  //     prod => {
  //       this.product = prod;
  //     },
  //     _ => console.log('Get Cart Failed')
  //   );
  // }
  // public getProduct(): void {
  //   this.helperService
  //     .getAll(
  //       "product"
  //     )
  //     .then((res: any) => {
  //       if (res) {
  //         this.product = res;
  //         for (let a of this.product) {
  //           let price = 0;
  //           price = a.price - (a.price * a.discount / 100);
  //           a.lastprice = price;
  //         }
  //       }
  //       this.product = this.product.filter((data :any) => data.id);
  //       this.singleProduct = this.product;
  //       console.log(this.singleProduct)
  //     })
  //     .catch((error) => {
  //       console.log("loi")
  //     })
  // }
  public getProductdetail(): void {
    this.helperService
      .findInfoById(
        "product", this.id)
      .then((res: any) => {
        if (res) {
          this.singleProduct = res;
          const b = res.price - (res.price * res.discount / 100);
          this.singleProduct.lastprice = b;
        }
      })
      .catch((error) => {
        console.log("loi")
      })
  }
  addToCart(){
    // let idx = this.cart.findIndex((item:any)=>{
    //   return item.id == this.id
    // });
    // if (idx >= 0){
    //   this.cart[idx].quantity += 1;
    // }else{
      this.helperService
        .add(
          "cart", this.id)
        .then((res: any) => {
        })
        .catch((error) => {
          console.log("loi")
        })
    // }
  }
  changeIndex( index: any ){
    this.selectedProductIndex = index;
  }
  close(answer: string) {
    this.dialogRef.close(answer);
  }
}
