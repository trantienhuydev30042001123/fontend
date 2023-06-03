import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {SignUp} from "../../model/SignUp";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{
  status = ''
  hide = true;
  form: any = {};
  error1: any = {
    message:"no_user"
  }
  error2: any = {
    message:"no_email"
  }
  success: any = {
    message:"yes"
  }
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  signUp: SignUp;
  constructor(private auth: AuthService) {}
  ngOnInit(): void {
  }
  ngSubmit() {
    this.signUp = new SignUp(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    )
    this.auth.signUp(this.signUp).subscribe(data =>{
      console.log(data)
      if (data==this.error1){
        this.status = 'the username is existed! please try again'
      }
      if (data==this.error2){
        this.status = 'the email is existed! please try again'
      }
      if (data==this.success){
        this.status = 'create success'
      }
    })
  }
}
