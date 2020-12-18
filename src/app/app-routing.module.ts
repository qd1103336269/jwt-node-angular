import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrPageComponent } from './err-page/err-page.component';


const routes: Routes = [
  {
    component: LoginComponent,
    path:'login',
  },
  {
    component: HomeComponent,
    path: 'home'
  },
  {
    path: '',
    redirectTo:'/login',
    pathMatch: 'full'
  },
  {
    component: ErrPageComponent,
    path: '**'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
