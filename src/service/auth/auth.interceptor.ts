import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {ConfigService} from '../config.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService, private config: ConfigService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if ( ['POST', 'PUT', 'DELETE'].includes(request.method) || request.url === `${this.config.getApiUrl()}/users/me`) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.auth.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
