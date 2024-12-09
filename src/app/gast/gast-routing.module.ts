import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GastPage } from './gast.page';

const routes: Routes = [
  {
    path: '',
    component: GastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GastPageRoutingModule {}
