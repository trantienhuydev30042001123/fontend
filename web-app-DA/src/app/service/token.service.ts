import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
const TOKEN_KEY = 'Token_Key';
const NAME_KEY = 'Name_Key';
const ROLE_KEY = 'Role_Key';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private roles: Array<string> = [];
  constructor(private router: Router) {}
  public setToken(token: string){
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,token);
  }
  public getToken(): string | null {
    const token = localStorage.getItem(TOKEN_KEY);
    return token !== null ? token : null;
  }
  public setName(name: string){
    window.localStorage.removeItem(NAME_KEY);
    window.localStorage.setItem(NAME_KEY,name);
  }

  public getName(): string | null{
    const name = localStorage.getItem(NAME_KEY);
    return name !== null ? name : null;
  }

  public setRole(roles: string[]){
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY,JSON.stringify(roles));
  }
  public getRole(): string[] {
    this.roles = [];
    const roleString = sessionStorage.getItem(ROLE_KEY);
    if (roleString !== null) {
      const parsedRoles = JSON.parse(roleString);
      parsedRoles.forEach((role: any) => {
        this.roles.push(role.authority);
      });
    }
    return this.roles;
  }

  public logOut(){
    window.localStorage.removeItem(NAME_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
    location.reload();
  }
}
