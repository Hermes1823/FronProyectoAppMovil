import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregargastoPage } from './agregargasto.page';

const routes: Routes = [
  {
    path: '',
    component: AgregargastoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregargastoPageRoutingModule {}
