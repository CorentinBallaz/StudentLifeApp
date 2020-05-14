import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NotesManagerPageRoutingModule } from './notes-manager-routing.module';
import { NotesManagerPage } from './notes-manager.page';

const routes: Routes = [
  {
    path: '/notes-manager',
    component: NotesManagerPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotesManagerPageRoutingModule,
    RouterModule.forChild(routes),
  ],
  declarations: [NotesManagerPage]
})
export class NotesManagerPageModule {}