import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home',
  loadChildren: './home/home.module#HomePageModule',
  canActivate: [AuthGuardService]
  },
  {
    path: 'time-manager',
    loadChildren: './time-manager/time-manager.module#TimeManagerPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'notes-manager',
    loadChildren: () => import('./notes-manager/notes-manager.module').then( m => m.NotesManagerPageModule)
  },
  {
    path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'inside',
    loadChildren: './pages/inside/inside.module#InsidePageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
