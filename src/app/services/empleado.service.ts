import { EmpleadoModel } from './../models/empleado.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8000/api/empleado';


  // Método para obtener todas las categorías
  ObtenerTodos(){
    return this.http.get<[EmpleadoModel]>(this.url);
    }

     // Obtener todos los empleados
 

}


