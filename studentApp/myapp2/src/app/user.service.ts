import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }


  login(user:IUser) {
    return this.httpClient.post<{success:number, data:string}>(environment.server+`/users/login`,user);
  }
  addUser(user:IUser) {
    return this.httpClient.post<{success:number, data:IUser}>(environment.server+`/users`, user);
  }

}
