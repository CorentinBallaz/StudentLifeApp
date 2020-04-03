import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', 
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'time-manager',
    loadChildren: () => import('./time-manager/time-manager.module').then( m => m.TimeManagerPageModule)
  },
  {
    path: 'notes-manager',
    loadChildren: () => import('./notes-manager/notes-manager.module').then( m => m.NotesManagerPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
