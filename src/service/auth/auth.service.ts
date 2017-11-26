import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {

  constructor() {
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    return tokenNotExpired('token');
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public removeToken(): void {
    localStorage.removeItem('token');
  }
}
