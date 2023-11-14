import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { DataImportComponent } from './data-import.component';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';
import { FormsModule } from '@angular/forms';



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
    FormsModule,
    SharedMaterialModule,
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]

})
export class DataImportModule { }
