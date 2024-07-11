import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AdminUser, UserLogin } from '../model/adminUser';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  private apiUrl = 'https://localhost:7210/api/AdminUser'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Corresponds to AdminUserController.RegisterAsync
  register(adminUser: AdminUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, adminUser)
     .pipe(
        catchError(this.handleError)
      );
  }

  // Corresponds to AdminUserController.LoginAsync
  login(userLogin: UserLogin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, userLogin)
     .pipe(
        catchError(this.handleError)
      );
  }

  // Corresponds to AdminUserController.GetUsersAsync
  getUsers(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(`${this.apiUrl}/users`)
     .pipe(
        catchError(this.handleError)
      );
  }

  // Corresponds to AdminUserController.UpdateUserAsync
  updateUser(adminUser: AdminUser): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, adminUser)
     .pipe(
        catchError(this.handleError)
      );
  }

  // Corresponds to AdminUserController.DeleteUserAsync
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`)
     .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}