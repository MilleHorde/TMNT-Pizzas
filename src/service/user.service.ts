import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {Response} from '../model/response';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private config: ConfigService) {
  }

  get(): Observable<Response<User[]>> {
    return this.http.get<Response<User[]>>(`${this.config.getApiUrl()}/users`);
  }

  getById(id: string): Observable<Response<User>> {
    return this.http.get<Response<User>>(`${this.config.getApiUrl()}/users/${id}`);
  }

  getMe(): Observable<Response<User>> {
    return this.http.get<Response<User>>(`${this.config.getApiUrl()}/users/me`);
  }

  signUp(user: User): Observable<Response<string>> {
    return this.http.post<Response<string>>(`${this.config.getApiUrl()}/users/signup`, user);
  }

  signIn(email: string, password: string): Observable<Response<string>> {
    const credentials = {
      email: email,
      password: password
    };
    return this.http.post<Response<string>>(`${this.config.getApiUrl()}/users/signin`, credentials);
  }

  update(user: any, id: string): Observable<Response<User>> {
    return this.http.put<Response<User>>(`${this.config.getApiUrl()}/users/${id}`, user);
  }

  remove(id: string): Observable<Response<Boolean>> {
    return this.http.delete<Response<Boolean>>(`${this.config.getApiUrl()}/users/${id}`);
  }
}

