import { inject, Injectable, signal } from "@angular/core";
import { AuthenticatedFetchService } from "../authenticatedFetch";





@Injectable()
export class UsersService {

  authFetch = inject(AuthenticatedFetchService  )

  apiUrl = "http://localhost:3001/users";

  users = signal<User[]>([]);

  user = signal<User | null>(null);

  constructor() {
    this.getUsers()
  }

  async getUsers() {
    const response = await this.authFetch.fetch(this.apiUrl).then((response) => response.json());

    this.users.set(response);

    return response;
  }

  async getUser(id: string) {
    const response = await this.authFetch.fetch(`${this.apiUrl}/${id}`).then((response) => response.json());

    this.user.set(response);

    return response;

  }

  async updateUser(user: any) {
    const response = await this.authFetch.fetch(`${this.apiUrl}/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(user)
    }).then((response) => response.json());

    this.user.set(response);

    return response;
  }

  async deleteUser(id: string) {
    const response = await this.authFetch.fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE'
    });

    return response.json();
  }

}