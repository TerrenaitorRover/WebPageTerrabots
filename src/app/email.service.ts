import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'https://server-terrenaitor-rover.onrender.com/send-email'; // URL del backend

  constructor(private http: HttpClient) {}

  sendEmail(to: string, subject: string, message: string): Observable<any> {
    return this.http.post(this.apiUrl, { to, subject, message });
  }
}
