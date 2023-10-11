import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginDialogComponent } from './dialog/login.dialog.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../../shared/shared.material.module';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];


@NgModule({
  declarations: [
    LoginComponent,
    LoginDialogComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]

})
export class LoginModule { }
