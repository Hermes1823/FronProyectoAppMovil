import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriaModel } from '../models/categoria.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  // URL del API para las categorías
  private url = 'http://localhost:8000/api/categoria';

  constructor(private http: HttpClient) { }

  // Método para obtener todas las categorías
  ObtenerTodos(){
    return this.http.get<[CategoriaModel]>(this.url);
    }

  // Método para agregar una nueva categoría
  Agregar(categoria: CategoriaModel): Observable<any> {
    return this.http.post(this.url, categoria);
  }

  // Método para editar una categoría existente
  Editar(categoria: CategoriaModel, id: number): Observable<CategoriaModel> {
    return this.http.put<CategoriaModel>(`${this.url}/${id}`, categoria);
  }

  // Método para eliminar una categoría
  Eliminar(id:number){
    return this.http.delete(this.url+'/'+ id);
    }

}