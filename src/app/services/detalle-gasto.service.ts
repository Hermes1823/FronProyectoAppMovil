import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleGastoService {
  private apiUrl = 'http://localhost:8000/api/detallegastos/'

  constructor(private http: HttpClient) {}

  getDetalleGastos(): Observable<DetalleGasto[]> {
    return this.http.get<DetalleGasto[]>(this.apiUrl)
  }

  getDetalleGasto(id: number): Observable<DetalleGasto> {
    return this.http.get<DetalleGasto>(this.apiUrl + id)
  }

  createDetalleGasto(detallegasto: DetalleGasto): Observable<DetalleGasto> {
    return this.http.post<DetalleGasto>(this.apiUrl, detallegasto)
  }

  updateDetalleGasto(id: number, detallegasto: DetalleGasto): Observable<DetalleGasto> {
    return this.http.put<DetalleGasto>(this.apiUrl + id, detallegasto)
  }

  deleteDetalleGasto(id: number): Observable<DetalleGasto> {
    return this.http.delete<DetalleGasto>(this.apiUrl + id)
  }
  
  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}${id}/pdf`, { responseType: 'blob' })
  }

  getChartData(): Observable<any> {
    return this.http.get(`${this.apiUrl}chart-data`)
  }
}

export interface DetalleGasto {
  id: number
  IdTipoGasto: number
  trip_id: number
  IdEmpleado: number
  Monto: number
  Fecha: Date
}