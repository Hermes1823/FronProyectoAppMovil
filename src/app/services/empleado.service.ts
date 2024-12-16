import { EmpleadoModel } from './../models/empleado.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private url = 'http://localhost:8000/api/empleado';
  constructor(private http: HttpClient) {}

  // Método para obtener todas las categorías
  ObtenerTodos() {
    return this.http.get<[EmpleadoModel]>(this.url);
  }
  Agregar(empleado: EmpleadoModel) {
    return this.http.post(this.url, empleado);
  }

  Editar(empleado: EmpleadoModel, id: number): Observable<EmpleadoModel> {
    return this.http.put<EmpleadoModel>(`${this.url}/${id}`, empleado);
  }

  Eliminar(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
