import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { userDTO } from '../dto/userDTO';
import { HelperService } from '../service/helper-service';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';

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
              private router1: Router,
              private dialog: MatDialog) {
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

  openDialog(){
    this.dialog
      .open(ProfileUpdateComponent, {
        data: this.UserId,
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((mess) => {
        if (mess) {
          this.getUser();
        }
      });
  }
 
}
