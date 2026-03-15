import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';

export interface ContactPayload {
  email: string;
  subject: string;
  message: string;
  website: string;
  startedAt: number;
  turnstileToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = '/.netlify/functions/contact';

  constructor(private http: HttpClient) {}

  sendEmail(payload: ContactPayload): Observable<any> {
    return this.http.post(this.apiUrl, payload).pipe(
      timeout(20000)
    );
  }
}
