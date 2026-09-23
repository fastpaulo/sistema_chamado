import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse, LoginCredentials, UserProfile } from '../interfaces/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly API_URL = '/usuarios';
  private readonly TOKEN_KEY = 'auth_token';

  // Signals para reatividade simplificada
  private currentUserSignal = signal<UserProfile | null>(null);
  
  // Computados e getters públicos
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.getToken());

  constructor() {
    this.loadStoredUser();
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    console.log(this.API_URL)
    return this.http.post<AuthResponse>(`${this.API_URL}/`, credentials).pipe(
      tap(response => {
        this.setToken(response.token);
        this.currentUserSignal.set(response.user);
        localStorage.setItem('user_profile', JSON.stringify(response.user));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('user_profile');
    this.currentUserSignal.set(null);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private loadStoredUser(): void {
    const token = this.getToken();
    const storedUser = localStorage.getItem('user_profile');
    
    if (token && storedUser) {
      try {
        this.currentUserSignal.set(JSON.parse(storedUser));
      } catch {
        this.logout();
      }
    }
  }
}