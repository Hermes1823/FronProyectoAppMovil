import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'registrar-libro',
    loadChildren: () =>
      import('./registrar-libro/registrar-libro.module').then(
        (m) => m.RegistrarLibroPageModule
      ),
  },
  {
    path: 'editar-libro/:id',
    loadChildren: () =>
      import('./editar-libro/editar-libro.module').then(
        (m) => m.EditarLibroPageModule
      ),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductPageModule),
  },
  {
    path: 'agregarproducto',
    loadChildren: () =>
      import('./agregarproducto/agregarproducto.module').then(
        (m) => m.AgregarproductoPageModule
      ),
  },
  {
    path: 'agregarcliente',
    loadChildren: () =>
      import('./agregarcliente/agregarcliente.module').then(
        (m) => m.AgregarclientePageModule
      ),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientPageModule),
  },
  {
    path: 'categ',
    loadChildren: () =>
      import('./categ/categ.module').then((m) => m.CategPageModule),
  },
  {
    path: 'agregarcategoria',
    loadChildren: () =>
      import('./agregarcategoria/agregarcategoria.module').then(
        (m) => m.AgregarcategoriaPageModule
      ),
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./inicio/inicio.module').then((m) => m.InicioPageModule),
  },
  {
    path: 'ruc',
    loadChildren: () => import('./ruc/ruc.module').then((m) => m.RucPageModule),
  },
  {
    path: 'empleado',
    loadChildren: () =>
      import('./empleado/empleado.module').then((m) => m.EmpleadoPageModule),
  },

  {
    path: 'agregargasto',
    loadChildren: () =>
      import('./agregargasto/agregargasto.module').then(
        (m) => m.AgregargastoPageModule
      ),
  },
  {
    path: 'gast',
    loadChildren: () =>
      import('./gast/gast.module').then((m) => m.GastPageModule),
  },
  {
    path: 'trip',
    loadChildren: () =>
      import('./trip/trip.module').then((m) => m.TripPageModule),
  },
  {
    path: 'trip-modal',
    loadChildren: () =>
      import('./trip-modal/trip-modal.module').then(
        (m) => m.TripModalPageModule
      ),
  },
  {
    path: 'work',
    loadChildren: () =>
      import('./work/work.module').then((m) => m.WorkPageModule),
  },
  {
    path: 'work-modal',
    loadChildren: () =>
      import('./work-modal/work-modal.module').then(
        (m) => m.WorkModalPageModule
      ),
  },
  {
    path: 'report',
    loadChildren: () =>
      import('./report/report.module').then((m) => m.ReportPageModule),
  },
  {
    path: 'report-modal',
    loadChildren: () =>
      import('./report-modal/report-modal.module').then(
        (m) => m.ReportModalPageModule
      ),
  },
  {
    path: 'agregarempleado',
    loadChildren: () =>
      import('./agregarempleado/agregarempleado.module').then(
        (m) => m.AgregarempleadoPageModule
      ),
  },
  {
    path: 'viaje',
    loadChildren: () =>
      import('./viaje/viaje.module').then((m) => m.ViajePageModule),
  },
  {
    path: 'agregarviaje',
    loadChildren: () =>
      import('./agregarviaje/agregarviaje.module').then(
        (m) => m.AgregarviajePageModule
      ),
  },
  {
    path: 'detalleviaje',
    loadChildren: () =>
      import('./detalleviaje/detalleviaje.module').then(
        (m) => m.DetalleviajePageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
