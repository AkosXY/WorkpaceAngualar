import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { TaskGridComponent } from './task-grid.component';


const routes: Routes = [
  {
    path: '',
    component: TaskGridComponent
  }
];


@NgModule({
  declarations: [
    TaskGridComponent
  ],
  imports: [
    CommonModule,

    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]

})
export class TaskGridModule { }
