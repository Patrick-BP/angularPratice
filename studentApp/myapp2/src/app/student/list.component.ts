import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IStud } from './student.inteface';
import { StudentService } from './student.service';

@Component({
  selector: 'app-list',
  template: `
    <p class="buttons">
      <button class="button" (click)="handleClick()">
        <span class="icon">
          <i class="fa-solid fa-plus"></i>
        </span>
        <span>ADD STUDENT</span>
      </button>
    </p>
    <div class="d-flex flex-wrap gap-3">
      <app-student *ngFor="let std of data" [data]="std"></app-student>
    </div>
  `,
  styles: [],
})
export class ListComponent implements OnInit {
  data!: IStud[];
  constructor(
    private stdService: StudentService,
    private router: Router
  ) {
    this.stdService.getAllStds().subscribe((response) => {
      this.data = response.data;
    });
  }

  ngOnInit(): void {}
  handleClick() {
    this.router.navigate(['','studs','add']);
  }
}
