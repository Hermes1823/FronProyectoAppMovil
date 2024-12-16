import { Injectable } from '@angular/core';
import { Report } from './report.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  private apiUrl = 'http://localhost:8000/api/work/'

  constructor(private http: HttpClient) {}

  getWorks(): Observable<Work[]> {
    return this,this.http.get<Work[]>(this.apiUrl)
  }

  getWork(id: number): Observable<Work> {
    return this.http.get<Work>(this.apiUrl + id)
  }

  createWork(work: Work): Observable<Work> {
    return this.http.post<Work>(this.apiUrl, work)
  }

  updateWork(id: number, work: Work): Observable<Work> {
    return this.http.put<Work>(this.apiUrl + id, work)
  }

  deleteWork(id: number): Observable<Work> {
    return this.http.delete<Work>(this.apiUrl + id)
  }

  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}${id}/pdf`, { responseType: 'blob' })
  }

  getChartData(): Observable<any> {
    return this.http.get(`${this.apiUrl}chart-data`)
  }
}

export interface Work {
  id: number
  name: string
  location: string
  start_date: Date
  end_date: Date
  reports: Report[]
}