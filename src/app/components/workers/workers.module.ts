import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { WorkersComponent } from './workers.component';



const routes: Routes = [
  {
    path: '',
    component: WorkersComponent
  }
];


@NgModule({
  declarations: [
    WorkersComponent
  ],
  imports: [
    CommonModule,

    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]

})
export class WorkersModule { }
