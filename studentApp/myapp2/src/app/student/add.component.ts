import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IStud } from './student.inteface';
import { StudentService } from './student.service';

@Component({
  selector: 'app-add',
  template: `
    <form [formGroup]="profileform" (ngSubmit)="onSubmit()" enctype="multipart/form-data">
      <div class="field">
        <label class="label">First Name</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-success"
            type="text"
            formControlName="first_name"
            placeholder="First Name"
            
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        
      </div>

      <div class="field">
        <label class="label">Last Name</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-success"
            type="text"
            formControlName="last_name"
            placeholder="Last Name"
            
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-success"
            type="text"
            formControlName="email"
            placeholder="Email"
           
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        
      </div>

      <div class="field">
        <label class="label">Avatar</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-success"
            type="file"
            formControlName="avatar"
            placeholder="Avatar"
            (change)="fileSelected($event)"
          />
          <span class="icon is-small is-left">
          <i class="fa-regular fa-image"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
       
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" [disabled]="profileform.invalid">Submit</button>
        </div>
        
      </div>
    </form>
  `,
  styles: [],
})
export class AddComponent implements OnInit {
  file!: File;
  profileform = inject(FormBuilder).nonNullable.group({
    first_name: ['', Validators.required],
    last_name: ['',Validators.required],
    email: ['',Validators.required],
    avatar: ['',[Validators.required, this.onlyImage]],
  });
  constructor(private stdService: StudentService, private toaster: ToastrService, private router: Router) {}

  ngOnInit(): void {}
fileSelected(event: Event){
    const input = event.target as HTMLInputElement
    if(input.files!.length > 0){
      this.file = input.files![0]
      console.log(this.file);
    }
  }

  onlyImage(control: FormControl){
    if(control.value){
      if(!control.value.endsWith('.jpg') && !control.value.endsWith('.png')){
        return {InvalidType: true}
    }
    
    }
    return null
  }  

  
  onSubmit() {
    const formData = new FormData();
    formData.append('email', this.profileform.get('email')!.value)
    formData.append('first_name', this.profileform.get('first_name')!.value)
    formData.append('last_name', this.profileform.get('last_name')!.value)
    formData.append('avatar', this.file)

this.stdService.addStd(formData as FormData).subscribe((response)=>{
  if(response.success){
    this.profileform.reset()
     this.toaster.success("Saved successfuly!")
     this.router.navigate(['studs'])
  }else{
    this.toaster.error("Save Failed")
  }
 
})
    
  }
  


}
