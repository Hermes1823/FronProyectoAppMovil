import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GastoModel } from '../models/gasto.model'; // Asegúrate de tener este modelo en tu carpeta de modelos

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  // URL del API para los gastos
  private url = 'http://localhost:8000/api/gastos';

  constructor(private http: HttpClient) { }

  // Método para obtener todos los gastos
  ObtenerTodos(): Observable<GastoModel[]> {
    return this.http.get<GastoModel[]>(this.url);
  }

  // Método para agregar un nuevo gasto
  Agregar(gasto: GastoModel): Observable<any> {
    return this.http.post(this.url, gasto);
  }

  // Método para editar un gasto existente
  Editar(gasto: GastoModel, id: number): Observable<GastoModel> {
    return this.http.put<GastoModel>(`${this.url}/${id}`, gasto);
  }

  // Método para eliminar un gasto
  Eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}