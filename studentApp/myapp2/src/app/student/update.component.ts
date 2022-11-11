import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IStud } from './student.inteface';
import { StudentService } from './student.service';

@Component({
  selector: 'app-update',
  template: `
    <form [formGroup]="profileform" (ngSubmit)="onSubmit()">
      <div class="field">
        <label class="label">First Name</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-success"
            type="text"
            formControlName="first_name"
            placeholder="First Name"
            value="bulma"
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
        <label class="label">Last Name</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-success"
            type="text"
            formControlName="last_name"
            placeholder="Last Name"
            value="bulma"
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
            placeholder="Email"
            value="bulma"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        <p class="help is-success">This username is available</p>
      </div>

      <div class="field">
        <label class="label">Avatar</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-success"
            type="text"
            formControlName="avatar"
            placeholder="Avatar"
            value="bulma"
          />
          <span class="icon is-small is-left">
            <i class="fa-regular fa-image"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        <p class="help help is-danger">This username is available</p>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Submit</button>
        </div>
      </div>
    </form>
  `,
  styles: [],
})
export class UpdateComponent implements OnInit {
  studentData!: IStud;
  id!: string;
  profileform = inject(FormBuilder).nonNullable.group({
    first_name: [''],
    last_name: [''],
    email: [''],
    avatar: [''],
  });
  constructor(
    private router: Router,
    private studService: StudentService,
    private activedRouter: ActivatedRoute,
    private toaster: ToastrService
  ) {
    this.id = activedRouter.snapshot.paramMap.get('std_id') as string;
    this.studService.getStd(this.id).subscribe((response) => {
      this.studentData = response.data;
      this.profileform.patchValue(this.studentData);
    });
  }
  onSubmit() {
    this.studService
      .updateStd(this.profileform.value as IStud, this.id)
      .subscribe((response) => {
        if (response.success) {
          this.toaster.success('updated successfuly!');
          this.router.navigate(['studs']);
        } else {
          this.toaster.error('update Failed');
        }
      });
    this.router.navigate(['studs']);
  }
  ngOnInit(): void {}
}
