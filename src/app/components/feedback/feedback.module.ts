import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../../shared/shared.material.module';
import { FeedbackComponent } from './feedback.component';


const routes: Routes = [
  {
    path: '',
    component: FeedbackComponent
  }
];

@NgModule({
  declarations: [
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]

})
export class FeedbackModule { }
