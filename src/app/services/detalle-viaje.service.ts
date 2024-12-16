import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DetalleViajeService {
private apiUrl = 'http://localhost:8000/api/detalleviajes/'

  constructor(private http: HttpClient) {}

  getDetalleViajes(): Observable<DetalleViaje[]> {
    return this.http.get<DetalleViaje[]>(this.apiUrl)
  }

  getDetalleViaje(id:number): Observable<DetalleViaje> {
    return this.http.get<DetalleViaje>(this.apiUrl + id)
  }

  createDetalleViaje(detalleviaje: DetalleViaje): Observable<DetalleViaje> {
    return this.http.post<DetalleViaje>(this.apiUrl, detalleviaje)
  }

  updateDetalleViaje(id: number, detalleviaje: DetalleViaje): Observable<DetalleViaje> {
    return this.http.put<DetalleViaje>(this.apiUrl + id, detalleviaje)
  }

  deleteDetalleViaje(id: number): Observable<DetalleViaje> {
    return this.http.delete<DetalleViaje>(this.apiUrl + id)
  }

  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}${id}/pdf`, { responseType: 'blob' })
  }

  getChartData(): Observable<any> {
    return this.http.get(`${this.apiUrl}chart-data`)
  }
}

export interface DetalleViaje {
  id: number
  IdViaje: number
  IdEmpleado: number
  FechaSalida: Date
  FechaRegreso: Date
}
