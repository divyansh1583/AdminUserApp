import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path:'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule),canActivate:[AuthGuard]},
  // {path:'**',redirectTo:' ',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
