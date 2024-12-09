import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RucPage } from './ruc.page';

const routes: Routes = [
  {
    path: '',
    component: RucPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RucPageRoutingModule {}
