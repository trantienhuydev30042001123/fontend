import {Component, Inject, OnInit} from '@angular/core';
import {HelperService} from "../service/helper-service";
import {ReplaySubject} from "rxjs";
import {productDTO} from "../dto/ProductDTO";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ProductViewDetailsComponent} from "../product-view-details/product-view-details.component";
import {StarRatingComponent} from "ng-starrating";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ]
})
export class ProductComponent implements OnInit {
  product: productDTO[] = [];
  productR: productDTO[] = [];
  rating: number = 6;
  p: number = 1;
  formSearch: FormGroup;

  searchKeyword = "";
  startprice : number = 0;
  endprice : number = 0;

  constructor(private helperService: HelperService,
              private dialog: MatDialog,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public id: number,) {
  }

  ngOnInit(): void {
    this.getData(this.searchKeyword,this.startprice,this.endprice);
    this.getProductByRating()
  }

  public getData(searchKeyword: string,startPrice: number,endPrice:number): void {
    this.helperService
      .getAllSearch(
        "product" ,searchKeyword,this.startprice,this.endprice
      )
      .then((res: any) => {

        if (res) {
          for (let i = res.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [res[i], res[j]] = [res[j], res[i]];
          }
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
  public getProductByRating(): void {
    this.helperService
      .findProductByCategory(
        "product/Rating",this.rating
      )
      .then((res: any) => {
        if (res) {
          this.productR = res;
          for (let a of this.productR) {
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
