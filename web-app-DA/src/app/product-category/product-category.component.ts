import {Component, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {productDTO} from "../dto/ProductDTO";
import {ActivatedRoute, Router} from "@angular/router";
import {HelperService} from "../service/helper-service";
import {preloadAndParseTemplate} from "@angular/compiler-cli/src/ngtsc/annotations/component/src/resources";
import {ProductViewDetailsComponent} from "../product-view-details/product-view-details.component";

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ]
})
export class ProductCategoryComponent implements OnInit{
  product: productDTO[] = [];
  p: number = 1;
  categoryId : number;
  constructor(private router: ActivatedRoute,
              private helperService: HelperService,
              private dialog: MatDialog,) {
  }
  ngOnInit(): void {
      this.router.queryParams.subscribe((params :any) =>{
        this.categoryId = params.data
        this.getListProductByCategory()
      });
  }
  // ngDoCheck() {
  //       this.router.queryParams.subscribe((params :any) =>{
  //         console.log(params.data);
  //         this.categoryId = params.data
  //       });
  //       this.getListProductByCategory()
  // }
  public getListProductByCategory(): void {
    this.helperService
      .findProductByCategory(
        "product/category",this.categoryId
      )
      .then((res: any) => {
        if (res) {
          this.product = res;
          for (let a of this.product) {
            let price = 0;
            price = a.price - (a.price * a.discount / 100);
            a.lastprice = price;
          }
          for (let a of res) {
            let star = 0;
            if (a.rating) {
              const b = a.rating
              star = b.stars
            }
            a.star = star;
          }
        }
      })
      .catch((error) => {
        console.log("loi")
      })
  }
  showProductDetails(id: string) {
    this.dialog
      .open(ProductViewDetailsComponent, {
        autoFocus: false,
        data: id
      })
      .afterClosed()
      .subscribe((mess) => {
      });
  }

}
