import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Libro {
  idLibro?: number;      
  titulo: string;
  editorial: string;
  anopublicacion: number; 
  cantidad: number;
  estado: number;          
}

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = 'http://localhost:8000/api/listado'; // URL base de tu API

  constructor(private http: HttpClient) {}

  getLibros(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addLibro(libro: any): Observable<any> {
    return this.http.post(this.apiUrl, libro);
  }

  getLibro(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateLibro(libro: Libro, id: number): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${id}`, libro);
  }
  deleteLibro(id:number){
    return this.http.delete(this.apiUrl+'/'+ id);
    }
 
}
