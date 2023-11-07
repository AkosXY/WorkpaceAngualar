import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', loadChildren: () => import("./components/login/login.module").then(m => m.LoginModule) },
  { path: 'all-tasks', loadChildren: () => import("./components/task-grid/task-grid.module").then(m => m.TaskGridModule) },
  { path: 'pending-tasks', loadChildren: () => import("./components/task-grid/task-grid.module").then(m => m.TaskGridModule) },
  { path: 'my-workers', loadChildren: () => import("./components/workers/workers.module").then(m => m.WorkersModule) },
  { path: 'import', loadChildren: () => import("./components/data-import/data-import.module").then(m => m.DataImportModule) },
  { path: 'location', loadChildren: () => import("./components/location/location.module").then(m => m.LocationModule) },
  { path: 'analytics', loadChildren: () => import("./components/analytics/analytics.module").then(m => m.AnalyticsModule) },
  { path: 'profile', loadChildren: () => import("./components/profile/profile.module").then(m => m.ProfileModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
