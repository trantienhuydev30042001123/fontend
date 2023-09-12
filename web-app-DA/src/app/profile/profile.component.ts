import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userDTO } from '../dto/userDTO';
import { HelperService } from '../service/helper-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any;
  UserId : number;
  user : userDTO[] = [];

  constructor(private helperService: HelperService,
              private router: ActivatedRoute,
              private router1: Router,) {
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe((params :any) =>{
      this.UserId = params.data
    });
    this.getUser()
  }

  public getUser(): void {
    this.helperService
      .findInfoByIdN(
        "account", this.UserId
      )
      .then((res: any) => {
        console.log(res)
        this.user = res;
      })
      .catch((error) => {
        console.log("loi")
      })
  }

  public order(): void {
    this.router1.navigate(['order'], {
    })
  }
}
