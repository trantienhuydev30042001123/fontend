import {Component, DoCheck, OnChanges, Input, OnInit, SimpleChanges} from '@angular/core';
import {TokenService} from "../../service/token.service";
import {Router} from "@angular/router";
import {HelperService} from "../../service/helper-service";
import {productDTO} from "../../dto/ProductDTO";
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  carId: number;
  totalItem: number = 0;
  name: string | null;
  checkLogin = false;
  userData: any;
  userData1: any;
  intervalId: any;

  constructor(private tokenService: TokenService,
              private router: Router,
              private helperService: HelperService,
              private cartService: CartService,
  ) {
  }

  ngOnInit(): void {
    const userString = localStorage.getItem('ID_Key');
    if (userString) {
      this.userData1 = JSON.parse(userString);
    }
    this.cartService.cartUpdated$.subscribe(() => {
      this.getListCart();
    });
    if (this.tokenService.getToken()) {
      this.checkLogin = true;
      this.name = this.tokenService.getName()
    }
    this.getListCart()

    // const refreshIntervalSeconds = 0; // Đổi số giây tùy theo tần suất bạn muốn
    // this.intervalId = setInterval(() => {
    //   this.getListCart();
    // }, refreshIntervalSeconds * 1000); // Chuyển đổi thành mili giây
  }

  ngOnDestroy(): void {
    // Trước khi component bị hủy, hủy bỏ setInterval để ngừng gọi API
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // ngDoCheck(): void {
  //
  // }
  ngOnChanges(changes: SimpleChanges): void {

  }

  public getListCart(): void {
    this.helperService
      .getListCart(
        "cart",this.userData1
      )
      .then((res: any) => {
        this.totalItem = res.length;
      })
      .catch((error) => {
        console.log("loi")
      })
  }

  logOut() {
    this.tokenService.logOut();
    this.router.navigate(['home']).then(() => {
      window.location.reload();
    });
  }

  public getCategory(number: number): void {
    this.router.navigate(['Category'], {
      queryParams: {data: this.carId}
    })
  }

  profile() {
    const userString = localStorage.getItem('ID_Key');
    if (userString) {
      this.userData = JSON.parse(userString);
    }
    this.router.navigate(['profile'], {
      queryParams: {data: this.userData}
    })
  }
}
