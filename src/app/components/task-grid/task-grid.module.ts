import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { TaskGridComponent } from './task-grid.component';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';
import { NewTaskDialogComponent } from './new-task-dialog/new-task-dialog.component';
import { DeleteTaskDialogComponent } from './delete-task-dialog/delete-task-dialog.component';


const routes: Routes = [
  {
    path: '',
    component: TaskGridComponent
  }
];


@NgModule({
  declarations: [
    TaskGridComponent,
    NewTaskDialogComponent,
    DeleteTaskDialogComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]

})
export class TaskGridModule { }
