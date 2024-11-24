import { inject, Injectable } from "@angular/core";
import { AuthenticatedFetchService } from "./authenticatedFetch";





@Injectable()
export class FileService {

  authFetch = inject(AuthenticatedFetchService)

  apiUrl = "http://localhost:3000/file";

  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.authFetch.fetch(this.apiUrl, {
      method: 'POST',
      body: formData
    })

    return response.json()
  }
}