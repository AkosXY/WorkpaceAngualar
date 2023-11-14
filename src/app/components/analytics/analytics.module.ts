import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';



const routes: Routes = [
  {
    path: '',
    component: AnalyticsComponent
  }
];


@NgModule({
  declarations: [
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,

    RouterModule.forChild(routes),

  ],
  providers:[DatePipe],
  exports: [RouterModule]

})
export class AnalyticsModule { }
