import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViajeModel } from '../models/viaje.model'; // Cambié ClienteModel por ViajeModel
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViajesService { // Cambié el nombre del servicio a ViajesService

  private url = 'http://localhost:8000/api/viaje'; // Cambié la URL para que sea de viajes

  constructor(private http: HttpClient) { }

  ObtenerTodos() {
    return this.http.get<[ViajeModel]>(this.url); // Cambié ClienteModel por ViajeModel
  }

  Agregar(viaje: ViajeModel) { // Cambié ClienteModel por ViajeModel
    return this.http.post(this.url, viaje); // Cambié el parámetro cliente a viaje
  }

  Editar(viaje: ViajeModel, id: number): Observable<ViajeModel> { // Cambié ClienteModel por ViajeModel
    return this.http.put<ViajeModel>(`${this.url}/${id}`, viaje); // Cambié el parámetro cliente a viaje
  }

  Eliminar(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
