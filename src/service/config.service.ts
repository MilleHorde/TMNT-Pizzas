import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  private apiUrl = 'https://tmnt-js-mille-horde.c9users.io';

  constructor() {
  }

  getApiUrl(): string {
    return this.apiUrl;
  }

}
