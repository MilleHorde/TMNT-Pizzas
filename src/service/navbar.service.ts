import {Injectable} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Injectable()
export class NavbarService {
  public visible: boolean;
  public isLogged: boolean;

  constructor(private authService: AuthService) {
    this.visible = true;
    this.isLogged = authService.isAuthenticated();
  }

  refreshStateLogged(): void {
    this.isLogged = this.authService.isAuthenticated();
  }

  getStateLogged(): boolean {
    this.refreshStateLogged();
    return this.isLogged;
  }

  hide(): void {
    this.visible = false;
  }

  show(): void {
    this.visible = true;
  }

}
