import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {orderDetailsDTO} from '../dto/orderDetailsDTO';
import {orderDTO} from '../dto/orderDTO';
import {productDTO} from '../dto/ProductDTO';
import {HelperService} from '../service/helper-service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderDetails: orderDetailsDTO[] = [];
  order: orderDTO[] = [];
  product: productDTO[] = [];

  constructor(private router: Router,
              private helperService: HelperService,) {
  }

  ngOnInit(): void {
    this.getListOrder();
    this.getListOrderDetails();
  }

  public getListOrder(): void {
    this.helperService
      .getAll(
        "order"
      )
      .then((res: any) => {
        this.order = res;
        for (let a of this.order) {
          let product1: productDTO[] = [];
          this.orderDetails = a.orderDetail;
            let product = this.orderDetails;
            product.forEach((item: any) => {
              product1.push(item.product);
              this.product = product1
            })
            let name = this.product;
            name.forEach((item: any) => {
              name.push(item.name);
              console.log(name);
            })
        }
      })
      .catch((error) => {
        console.log("loi")
      })
  }

  public getListOrderDetails(): void {
    this.helperService
      .getAll(
        "order/orderDetal"
      )
      .then((res: any) => {
        this.orderDetails = res;
      })
      .catch((error) => {
        console.log("loi")
      })
  }

}
