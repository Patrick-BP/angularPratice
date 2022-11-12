import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StateService } from './state.service';
import { IUser } from './user.interface';
import { UserService } from './user.service';
import jwt_decode from "jwt-decode"
@Component({
  selector: 'app-login',
  template: `
  <form [formGroup]="form" (ngSubmit)="submitFunc()">
    <div class="field">
  <p class="control has-icons-left has-icons-right">
    <input class="input" type="email" formControlName="email" placeholder="Email">
    <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
  </p>
</div>
<div class="field">
  <p class="control has-icons-left">
    <input class="input" type="password" formControlName="password" placeholder="Password">
    <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
  </p>
</div>
<div class="field">
  <p class="control">
    <button class="button is-success">
      Login
    </button>
  </p>
</div>
  </form>
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {
form = inject(FormBuilder).nonNullable.group({
  email:['pauls@gmail.com'],
  password:['123']
});
  constructor(private stateservice:StateService ,private userService: UserService, private router:Router, private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  submitFunc(){
    this.userService.login(this.form.value as IUser).subscribe((response)=>{
      console.log(response);
      if(response.success){
        this.toaster.success("Welcome!");
        const decoded = jwt_decode(response.data) as IUser;
        console.log(decoded);
        this.stateservice.state.next({
          email:decoded.email,
          fullname:decoded.fullname,
          token:response.data
        })
        this.router.navigate([''])
     }else{
       this.toaster.error("Login Failed")
     }
    })
  }

}


