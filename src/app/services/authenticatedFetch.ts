import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedFetchService {
  constructor(private keycloak: KeycloakService) { }

  async fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const authToken = await this.keycloak.getToken();
    const headers = {
      ...init?.headers,
      Authorization: `Bearer ${authToken}`,
    };

    const authInit: RequestInit = {
      ...init,
      headers,
    };

    return fetch(input, authInit);
  }
}