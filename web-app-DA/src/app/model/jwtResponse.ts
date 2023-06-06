export class JwtResponse{
  public token: string;
  public name: string;
  public id: string;
  public roles: any;


  constructor(token: string, name: string, id: string, roles: any) {
    this.token = token;
    this.name = name;
    this.id = id;
    this.roles = roles;
  }
}
