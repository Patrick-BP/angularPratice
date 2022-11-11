import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IStud } from './student.inteface';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student',
  template: `
    <div
      class="media p-1"
      style="width:300px; height:100px; box-shadow:0px 7px 28px -13px"
    >
      <div class="media-left">
        <figure class="image is-50x50">
          <img
            [src]="std.avatar"
            style="width:50px ;"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="media-content " style="width:100% ;">
        <p class="title is-4">{{ std.first_name }} {{ std.last_name }}</p>
        <p class="subtitle is-6">{{ std.email }}</p>
      </div>
      <div class="media-content">
        <a [routerLink]="['update', std._id]"
          ><i class="fa-solid fa-pen" style="color:gray "></i
        ></a>
        <br />
        <i
          class="fa-solid fa-trash-can"
          style="color:red "
          (click)="deleteStd()"
        ></i>
      </div>
    </div>
  `,
  styles: [],
})
export class StudentComponent implements OnInit {
  @Input('data') std!: IStud;
  constructor(
    private stdService: StudentService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  deleteStd() {
    this.stdService.deleteStd(this.std._id).subscribe((response) => {
      if (response.success) {
        this.toaster.success('deleted successfuly!');
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['studs']);
          
      });
      } else {
        this.toaster.error('Save Failed');
      }
    });
  }
}
