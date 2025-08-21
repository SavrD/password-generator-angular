import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PasswordService {
  private apiUrl = 'https://api.api-ninjas.com/v1/passwordgenerator';
  private http = inject(HttpClient);

  generatePassword(length: number, numbers: boolean, special: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'X-Api-Key': environment.apiNinjasKey || ''
    });

    const params = new URLSearchParams({ length: String(length) });
    if (numbers) params.append('numbers', 'true');
    if (special) params.append('special', 'true');

    return this.http.get<any>(`${this.apiUrl}?${params.toString()}`, { headers });
  }
}
