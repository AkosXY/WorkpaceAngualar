import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { WorkersComponent } from './workers.component';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';
import { NewWorkerDialogComponent } from './new-worker-dialog/new-worker-dialog.component';
import { DeleteWorkerDialogComponent } from './delete-worker-dialog/delete-worker-dialog.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: WorkersComponent
  }
];


@NgModule({
  declarations: [
    WorkersComponent,
    NewWorkerDialogComponent,
    DeleteWorkerDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]

})
export class WorkersModule { }
