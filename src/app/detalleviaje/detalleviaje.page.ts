import { Component, OnInit } from '@angular/core';
import { DetalleviajeService } from '../services/detalleviaje.service';
import { DetalleViajeModel } from '../models/detalleviaje.model';

@Component({
  selector: 'app-detalleviaje',
  templateUrl: './detalleviaje.page.html',
  styleUrls: ['./detalleviaje.page.scss'],
})
export class DetalleviajePage implements OnInit {
  detallesViajes: DetalleViajeModel[] = [];
  detalleViaje: DetalleViajeModel = {
    IdViaje: 0,
    IdEmpleado: 0,
    FechaSalida: '',
    FechaRegreso: ''
  };

  constructor(private detalleViajeService: DetalleviajeService) {}

  ngOnInit() {
    this.obtenerDetallesViajes();
  }

  // Obtener todos los detalles de viaje
  obtenerDetallesViajes() {
    this.detalleViajeService.obtenerDetallesViajes().subscribe((data) => {
      this.detallesViajes = data;
    });
  }

  // Guardar o actualizar un detalle de viaje
  guardarDetalleViaje() {
    if (this.detalleViaje.IdViaje && this.detalleViaje.IdEmpleado) {
      // Si tiene ambos valores, es una actualización
      this.detalleViajeService
        .editar(this.detalleViaje, this.detalleViaje.IdViaje, this.detalleViaje.IdEmpleado)
        .subscribe(() => {
          this.obtenerDetallesViajes();
          this.detalleViaje = { IdViaje: 0, IdEmpleado: 0, FechaSalida: '', FechaRegreso: '' }; // Limpiar formulario
        });
    } else {
      // Si no tiene ambos valores, es un nuevo registro
      this.detalleViajeService.agregar(this.detalleViaje).subscribe(() => {
        this.obtenerDetallesViajes();
        this.detalleViaje = { IdViaje: 0, IdEmpleado: 0, FechaSalida: '', FechaRegreso: '' }; // Limpiar formulario
      });
    }
  }

  // Editar un detalle de viaje
  editarDetalle(detalle: DetalleViajeModel) {
    this.detalleViaje = { ...detalle };
  }

  // Eliminar un detalle de viaje
  eliminarDetalle(idViaje: number, idEmpleado: number) {
    this.detalleViajeService.eliminar(idViaje, idEmpleado).subscribe(() => {
      this.obtenerDetallesViajes();
    });
  }
}
