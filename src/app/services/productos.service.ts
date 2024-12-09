import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {ProductoModel } from '../models/producto.model';
import { Observable } from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class ProductosService {
private url='http://localhost:8000/api/producto';
constructor(private http:HttpClient ) { }
ObtenerTodos(){
return this.http.get<[ProductoModel]>(this.url);
}
Agregar(producto:ProductoModel){
return this.http.post(this.url,producto);
}

Editar(producto: ProductoModel, id: number): Observable<ProductoModel> {
    return this.http.put<ProductoModel>(`${this.url}/${id}`, producto);
  }

  Eliminar(id:number){
    return this.http.delete(this.url+'/'+ id);
    }
  


}
