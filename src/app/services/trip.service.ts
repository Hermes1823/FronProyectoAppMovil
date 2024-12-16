import { Injectable } from '@angular/core';
import { Report } from './report.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'http://localhost:8000/api/trip/'

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl)
  }

  getTrip(id: number): Observable<Trip> {
    return this.http.get<Trip>(this.apiUrl + id)
  }

  createTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip)
  }

  updateTrip(id: number, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(this.apiUrl + id, trip)
  }

  deleteTrip(id: number): Observable<Trip> {
    return this.http.delete<Trip>(this.apiUrl + id)
  }

  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}${id}/pdf`, { responseType: 'blob' })
  }

  getChartData(): Observable<any> {
    return this.http.get(`${this.apiUrl}chart-data`)
  }
}

export interface Trip {
  id: number
  destination: string
  start_date: Date
  end_date: Date
  description: string
  reports: Report[]
}