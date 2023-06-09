import {Component, Input} from '@angular/core';
import {SignIn} from "../../model/SignIn";
import {AuthService} from "../../service/auth.service";
import {TokenService} from "../../service/token.service";
import {sample} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  signIn: SignIn;
  form: any = {};
  

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) {
  }
  ngOnInit(): void{}
  ngSubmit() {
    this.login();
  }
  login(): void {
    this.signIn = new SignIn(
      this.form.username,
      this.form.password
    );

    this.authService.signIn(this.signIn).subscribe(data => {
      if (data.token != undefined) {
        this.tokenService.setToken(data.token);
        this.tokenService.setName(data.name);
        this.tokenService.setRole(data.roles);
        this.tokenService.setId(data.id);
        this.authService.setLoggedIn(true); // Đánh dấu là đã đăng nhập
        this.router.navigate(['home'], {
          queryParams: { data: data.id }
        });
      }
    });
  }
}
