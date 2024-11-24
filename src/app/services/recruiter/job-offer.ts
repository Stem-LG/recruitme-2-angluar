import { inject, Injectable } from "@angular/core";
import { AuthenticatedFetchService } from "../authenticatedFetch";



@Injectable()
export class RecruiterJobOfferService {

  authFetch = inject(AuthenticatedFetchService)

  apiUrl = "http://localhost:3000/offers";

  async createJobOffer(offer: {
    title: string,
    company: string,
    skills: string,
    description: string,
    images: string[]
  }) {

    const response = await this.authFetch.fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(offer)
    })
      .then(response => response.json())

    return response

  }

  async updateJobOffer(offer: jobOffer) {

    const response = await this.authFetch.fetch(this.apiUrl + `/${offer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(offer)
    })
      .then(response => response.json())

    return response
  }

  async deleteJobOffer(offer: jobOffer) {

    const response = await this.authFetch.fetch(this.apiUrl + `/${offer.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())

    return response
  }

}