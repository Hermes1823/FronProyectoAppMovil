import { EmpleadoService } from './../services/empleado.service';
import { EmpleadoModel } from './../models/empleado.model';// Asegúrate de que la ruta es correcta

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.page.html',
  styleUrls: ['./empleado.page.scss'],
})
export class EmpleadoPage implements OnInit {

  empleados: EmpleadoModel[] = []; // Aquí se almacenan todos los empleados
  empleados_filtrados: EmpleadoModel[] = []; // Aquí se almacenan los empleados filtrados

  constructor(private service: EmpleadoService) { }

  ngOnInit() {
    this.getAll(); // Cargar todos los empleados al inicio
  }

  ionViewWillEnter() {
    this.getAll(); // Recargar empleados cuando se navegue a esta página
  }

  // Obtener todos los empleados
  getAll() {
    this.service.ObtenerTodos().subscribe(
      (response: any) => {
        this.empleados = response; // Almacenamos todos los empleados
        this.empleados_filtrados = response; // Inicializamos la lista filtrada con todos los empleados
      }
    );
  }

  // Filtrar empleados por RUC
  filtrarEmpleado(event: any) {
    const valorBusqueda = event.target.value.toLowerCase(); // Obtener la consulta del searchbar

    if (valorBusqueda && valorBusqueda.trim() !== '') {
      // Filtrar los empleados que coincidan con el RUC ingresado
      this.empleados_filtrados = this.empleados.filter((empleado) => {
        return empleado.ruc.toString().includes(valorBusqueda); // Buscamos por el RUC
      });
    } else {
      // Si no hay búsqueda, mostramos todos los empleados
      this.empleados_filtrados = this.empleados;
    }
  }

 
}
