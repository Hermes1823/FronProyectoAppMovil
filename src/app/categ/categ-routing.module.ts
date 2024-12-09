import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategPage } from './categ.page';

const routes: Routes = [
  {
    path: '',
    component: CategPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategPageRoutingModule {}
