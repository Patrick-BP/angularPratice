import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from './user.interface';
import { UserService } from './user.service';

@Component({
  selector: 'app-register',
  template: `
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="field">
        <label class="label">FullName</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-success"
            type="text"
            formControlName="fullname"
            placeholder="FullName"
           
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        <p class="help is-success">This username is available</p>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-success"
            type="text"
            formControlName="email"
            placeholder="email"
          />
          <span class="icon is-small is-left">
          <i class="fa-regular fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        <p class="help is-success">This username is available</p>
      </div>


      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-success"
            type="password"
            formControlName="password"
            placeholder="Password"
          />
          <span class="icon is-small is-left">
          <i class="fa-solid fa-lock"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        <p class="help is-success">This username is available</p>
      </div>

     

      
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Save</button>
        </div>
        
      </div>
    </form>
  `,
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
form= inject(FormBuilder).nonNullable.group({
  email:['pauls@gmail.com'],
  fullname:['Paul Smith'],
  password:['123']
})
  constructor(private userService: UserService, private toaster:ToastrService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
   
this.userService.addUser(this.form.value as IUser).subscribe((response)=>{
  if(response.success){
    this.toaster.success("Saved successfuly!")
    this.router.navigate(['','login'])
 }else{
   this.toaster.error("Registration Failed")
 }

})
  }
}
