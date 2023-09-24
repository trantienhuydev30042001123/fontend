import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {productDTO} from "../../dto/ProductDTO";
import {HelperService} from "../../service/helper-service";
import {userDTO} from "../../dto/userDTO";
import * as querystring from "querystring";

interface carouse1Image {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images = [
    {
      imageSrc:
        'https://censor.vn/wp-content/uploads/2022/04/nike-dunk-black-white-banner-censorvn-1400x630.webp',
      imageAlt: 'nature1',
    },
    {
      imageSrc:
        'https://thietke6d.com/wp-content/uploads/2021/05/banner-quang-cao-giay-3.webp',
      imageAlt: 'nature2',
    },
    {
      imageSrc:
        'https://theme.hstatic.net/1000405402/1000724885/14/share_fb_home.png?v=71',
      imageAlt: 'person1',
    },
    {
      imageSrc:
        'https://theme.hstatic.net/200000355547/1000958382/14/home_banner_flashsale.jpg?v=339',
      imageAlt: 'person2',
    },
  ]
  @Input() indicators = true;
  @Input() autoSlide = true;
  @Input() slideInterval = 4000;
  carouse1Image = [];
  selectedIndex = 0;
  product: productDTO[] = [];
  user : userDTO[] = [];
  userId: number;

  constructor(private helperService: HelperService,
              private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    
    this.router.queryParams.subscribe((params: any) => {
      this.userId = params.data
    });
    // this.getUser();
    if (this.autoSlide) {
      this.autoSlideImage();
    }
  }

  autoSlideImage(): void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }

  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  // public getUser(): void {
  //   this.helperService
  //     .findInfoByIdN(
  //       "account", this.userId
  //     )
  //     .then((res: any) => {
  //       this.user = res;
  //     })
  //     .catch((error) => {
  //       console.log("loi")
  //     })
  // }
  
  
}

