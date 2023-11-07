import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from './location.component';
import { FormsModule } from '@angular/forms';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';
import { NewLocationDialogComponent } from './new-location-dialog/new-location-dialog.component';
import { GoogleMapsModule } from '@angular/google-maps';


const routes: Routes = [
  {
    path: '',
    component: LocationComponent
  }
];


@NgModule({
  declarations: [
    LocationComponent,
    NewLocationDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,
    GoogleMapsModule,
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]

})
export class LocationModule { }
