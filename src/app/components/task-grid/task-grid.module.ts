import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { TaskGridComponent } from './task-grid.component';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';
import { NewTaskDialogComponent } from './new-task-dialog/new-task-dialog.component';
import { DeleteTaskDialogComponent } from './delete-task-dialog/delete-task-dialog.component';
import { UnAssignTaskDialogComponent } from './unassign-task-dialog/unassign-task-dialog.component';
import { AssignTaskDialogComponent } from './assign-task-dialog/assign-task-dialog.component';
import { CapitalizeFirstLetterPipe } from 'src/app/shared/capitalize-first-letter.pipe';
import { ReviewTaskDialogComponent } from './review-task-dialog/review-task-dialog.component';


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
    UnAssignTaskDialogComponent,
    AssignTaskDialogComponent,
    DeleteTaskDialogComponent,
    ReviewTaskDialogComponent,
    CapitalizeFirstLetterPipe 

  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]

})
export class TaskGridModule { }
