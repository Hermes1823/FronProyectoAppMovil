import { Component, Input, OnInit } from '@angular/core';
import { DetalleGasto, DetalleGastoService } from '../services/detalle-gasto.service';
import { ModalController } from '@ionic/angular';
import { TipoGasto, TipoGastoService } from '../services/tipo-gasto.service';
import { Viaje, ViajeService } from '../services/viaje.service';
import { EmpleadoModel } from '../models/empleado.model';
import { EmpleadoService } from '../services/empleado.service';
import { Trip, TripService } from '../services/trip.service';

@Component({
  selector: 'app-detalle-gasto-modal',
  templateUrl: './detalle-gasto-modal.page.html',
  styleUrls: ['./detalle-gasto-modal.page.scss'],
})
export class DetalleGastoModalPage implements OnInit {
  @Input() action: string | undefined
  @Input() detallegasto: DetalleGasto = { id: 0, IdTipoGasto: 0, trip_id: 0, IdEmpleado: 0, Monto: 0, Fecha: new Date() }

  tipogastos: TipoGasto[] = []
  empleados: EmpleadoModel[] = []

  trips: Trip[] = []

  constructor(private modalController: ModalController, private detalleGastoService: DetalleGastoService, private tipoGastoService: TipoGastoService, private tripService: TripService, private empleadoService: EmpleadoService) {}

  ngOnInit() {
    this.loadTipoGastos()
    this.loadTrips()

  }

  loadTipoGastos() {
    this.tipoGastoService.getTipoGastos().subscribe(tipogastos => {
      this.tipogastos = tipogastos
    })
  }

  loadTrips() {
    this.tripService.getTrips().subscribe(trips => {
      this.trips = trips
    })
  }

  loadEmpleados() {
    this.empleadoService.ObtenerTodos().subscribe(empleados => {
      this.empleados = empleados
    })
  }

  save() {
    if (this.action === 'create') {
      this.detalleGastoService.createDetalleGasto(this.detallegasto).subscribe(() => {
        this.modalController.dismiss()
      })
    } else if (this.action === 'edit') {
      this.detalleGastoService.updateDetalleGasto(this.detallegasto.id, this.detallegasto).subscribe(() => {
        this.modalController.dismiss()
      })
    }
  }

  close() {
    this.modalController.dismiss()
  }
}
