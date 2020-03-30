import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesManagerPage } from './notes-manager.page';

const routes: Routes = [
  {
    path: '',
    component: NotesManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesManagerPageRoutingModule {}
