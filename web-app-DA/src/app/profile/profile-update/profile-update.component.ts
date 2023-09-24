// @ts-nocheck
import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { userDTO } from 'src/app/dto/userDTO';
import { HelperService } from 'src/app/service/helper-service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit{
  form: FormGroup;
  defaults: userDTO;
  user : userDTO[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public UserId: string,
              private dialogRef: MatDialogRef<ProfileUpdateComponent>,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private helperService: HelperService,) {
  }

  ngOnInit(): void {
    this.defaults = new userDTO();
    if (this.UserId ) {
      this.defaults.id = this.UserId;
      this.getUser();
      this.createForm();
    } else {
      this.createForm();
    }
  }


  public updateProfile(): void {
    if (this.form) {
      const profile: userDTO = this.form.value;
      console.log(this.UserId)
      this.helperService.update1(profile, "account", this.UserId)
        .then(() => {
          let mess = "Cập Nhật Thành Công!"
          console.log(mess)
          this.dialogRef.close(mess);
        }).catch(() => {
        console.log("loi")
      });
    } else {
      console.log("Biểu mẫu không tồn tại.");
    }
  }
  public trimData(fieldName, val: string): void {
    if (this.form) {
      const formControl = this.form.get(fieldName);
      if (formControl) {
        formControl.setValue(val.trim());
      }
    }
  }

  public createForm(): void {
    this.form = this.fb.group({
      id: [this.defaults.id],
      name: [this.defaults.name || ''],
      username: [this.defaults.username || ''],
      email: [this.defaults.email || ''],
    });
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
}
