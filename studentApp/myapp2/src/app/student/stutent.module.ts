import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from './update.component';
import { AddComponent } from './add.component';
import { ListComponent } from './list.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { ReactiveFormsModule } from '@angular/forms';

const MY_ROUTES: Routes = [
  { path: '', component: ListComponent, title: 'Students' },
  { path: 'add', component: AddComponent, title: 'add new student' },
  { path: 'update/:std_id', component: UpdateComponent, title: 'update student' },
];

@NgModule({
  declarations: [UpdateComponent, AddComponent, ListComponent, StudentComponent],
  imports: [CommonModule,ReactiveFormsModule, RouterModule.forChild(MY_ROUTES)],
})
export class StutentModule {}
