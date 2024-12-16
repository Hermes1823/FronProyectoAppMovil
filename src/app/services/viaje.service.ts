import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoGasto, TipoGastoService } from './tipo-gasto.service';
import { EmpleadoModel } from '../models/empleado.model';
import { EmpleadoService } from './empleado.service';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  private apiUrl = 'http://localhost:8000/api/viajes/'

  tipogastos: TipoGasto[] = []
  viajes: Viaje[] = []
  empleados: EmpleadoModel[] = []

  constructor(private http: HttpClient) {}

  getViajes(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(this.apiUrl)
  }

  getViaje(id:number): Observable<Viaje> {
    return this.http.get<Viaje>(this.apiUrl + id)
  }

  createViaje(viaje: Viaje): Observable<Viaje> {
    return this.http.post<Viaje>(this.apiUrl, viaje)
  }

  updateViaje(id: number, viaje: Viaje): Observable<Viaje> {
    return this.http.put<Viaje>(this.apiUrl + id, viaje)
  }

  deleteViaje(id: number): Observable<Viaje> {
    return this.http.delete<Viaje>(this.apiUrl + id)
  }

  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}${id}/pdf`, { responseType: 'blob' })
  }

  getChartData(): Observable<any> {
    return this.http.get(`${this.apiUrl}chart-data`)
  }
}

export interface Viaje {
  IdViaje: number
  Destino: string
}
