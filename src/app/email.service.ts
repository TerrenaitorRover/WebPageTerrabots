import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'https://servewebterrabots.onrender.com/send-email';

  constructor(private http: HttpClient) {}

  sendEmail(email: string, subject: string, message: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, subject, message }).pipe(
      timeout(30000)
    );
  }
}
