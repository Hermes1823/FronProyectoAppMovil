import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {ClienteModel } from '../models/cliente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private url='http://localhost:8000/api/cliente';

constructor(private http:HttpClient ) { }
ObtenerTodos(){
return this.http.get<[ClienteModel]>(this.url);
}
Agregar(cliente:ClienteModel){
return this.http.post(this.url,cliente);
}

Editar(cliente: ClienteModel, id: number): Observable<ClienteModel> {
    return this.http.put<ClienteModel>(`${this.url}/${id}`, cliente);
  }

  Eliminar(id:number){
    return this.http.delete(this.url+'/'+ id);
    }
  
}
