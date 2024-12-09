import { Component, OnInit } from '@angular/core';
import { GastosService } from 'src/app/services/gastos.service';
import { GastoModel } from 'src/app/models/gasto.model';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarcategoriaPage } from '../agregarcategoria/agregarcategoria.page';
@Component({
  selector: 'app-gasto',
  templateUrl: './gast.page.html',
  styleUrls: ['./gast.page.scss'],
})
export class GastPage implements OnInit {

  gastos: GastoModel[] = [];

  constructor(
    private gastosService: GastosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.obtenerGastos();
  }

  obtenerGastos() {
    this.gastosService.ObtenerTodos().subscribe(
      (response: GastoModel[]) => {
        this.gastos = response;
      },
      error => {
        console.error('Error al obtener los gastos', error);
      }
    );
  }

  agregarGasto() {
    // Redirige a la página para agregar un nuevo gasto
    this.router.navigate(['/agregar-gasto']);
  }

  editarGasto(gasto: GastoModel) {
    // Redirige a la página de edición del gasto
    this.router.navigate(['/editar-gasto', gasto.idgasto]);
  }

  eliminarGasto(id: number) {
    this.gastosService.Eliminar(id).subscribe(
      response => {
        console.log('Gasto eliminado', response);
        this.obtenerGastos();  // Recargar la lista de gastos
      },
      error => {
        console.error('Error al eliminar el gasto', error);
      }
    );
  }
}
