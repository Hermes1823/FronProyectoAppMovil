import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoGastoService {
  private apiUrl = 'http://localhost:8000/api/tipogastos/'

  constructor(private http:HttpClient) {}

  getTipoGastos(): Observable<TipoGasto[]> {
    return this.http.get<TipoGasto[]>(this.apiUrl)
  }
}

export interface TipoGasto {
  IdTipoGasto: number
  Descripcion: string
}