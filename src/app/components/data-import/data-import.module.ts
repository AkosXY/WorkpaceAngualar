import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { DataImportComponent } from './data-import.component';



const routes: Routes = [
  {
    path: '',
    component: DataImportComponent
  }
];


@NgModule({
  declarations: [
    DataImportComponent
  ],
  imports: [
    CommonModule,

    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]

})
export class DataImportModule { }
