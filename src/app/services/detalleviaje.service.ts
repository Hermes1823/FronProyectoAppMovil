import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleViajeModel } from './../models/detalleviaje.model';

@Injectable({
  providedIn: 'root'
})
export class DetalleviajeService {
  private apiUrl = 'http://localhost:8000/detalleviaje/';  // Cambia esta URL según tu API

  constructor(private http: HttpClient) {}

  // Obtener todos los detalles de viaje
  obtenerDetallesViajes(): Observable<DetalleViajeModel[]> {
    return this.http.get<DetalleViajeModel[]>(this.apiUrl);
  }

  // Agregar un nuevo detalle de viaje
  agregar(detalleViaje: DetalleViajeModel): Observable<DetalleViajeModel> {
    return this.http.post<DetalleViajeModel>(this.apiUrl, detalleViaje);
  }

  // Editar un detalle de viaje (clave compuesta)
  editar(detalleViaje: DetalleViajeModel, idViaje: number, idEmpleado: number): Observable<DetalleViajeModel> {
    return this.http.put<DetalleViajeModel>(`${this.apiUrl}/${idViaje}/${idEmpleado}`, detalleViaje);
  }

  // Eliminar un detalle de viaje
  eliminar(idViaje: number, idEmpleado: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idViaje}/${idEmpleado}`);
  }
}
