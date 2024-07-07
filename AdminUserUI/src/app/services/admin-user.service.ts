import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  private apiUrl = 'https://api.example.com/admin-users'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getAllAdminUsers(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAdminUser(id: number): Observable<AdminUser> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<AdminUser>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  addAdminUser(adminUser: AdminUser): Observable<AdminUser> {
    return this.http.post<AdminUser>(this.apiUrl, adminUser)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateAdminUser(adminUser: AdminUser): Observable<AdminUser> {
    const url = `${this.apiUrl}/${adminUser.id}`;
    return this.http.put<AdminUser>(url, adminUser)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteAdminUser(id: number): Observable<{}> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(error.message || 'Server error');
  }
}
