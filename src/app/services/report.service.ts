import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from './trip.service';
import { Work } from './work.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8000/api/report/'

  constructor(private http: HttpClient) {}

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.apiUrl)
  }

  getReport(id: number): Observable<Report> {
    return this.http.get<Report>(this.apiUrl + id)
  }

  createReport(report: Report): Observable<Report> {
    return this.http.post<Report>(this.apiUrl, report)
  }

  updateReport(id: number, report: Report): Observable<Report> {
    return this.http.put<Report>(this.apiUrl + id, report) 
  }

  deleteReport(id: number): Observable<Report> {
    return this.http.delete<Report>(this.apiUrl + id)
  }

  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}${id}/pdf`, { responseType: 'blob' })
  }

  getChartData(): Observable<any> {
    return this.http.get(`${this.apiUrl}chart-data`)
  }
}

export interface Report {
  id: number
  title: string
  content: string
  trip_id: number
  trip: Trip
  work_id: number
  work: Work
}