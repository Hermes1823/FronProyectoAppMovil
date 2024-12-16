import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkModalPage } from './work-modal.page';

const routes: Routes = [
  {
    path: '',
    component: WorkModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkModalPageRoutingModule {}
