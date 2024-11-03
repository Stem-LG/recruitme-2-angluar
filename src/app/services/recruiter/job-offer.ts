import { inject, Injectable } from "@angular/core";
import { AuthService } from "../auth";



@Injectable()
export class RecruiterJobOfferService {

  apiUrl = "http://localhost:3000/offers";

  authService = inject(AuthService)

  async createJobOffer(offer: {
    title: string,
    company: string,
    skills: string,
    description: string
  }) {

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      },
      body: JSON.stringify(offer)
    })
      .then(response => response.json())

    return response

  }

  async updateJobOffer(offer: jobOffer) {

    const response = await fetch(this.apiUrl + `/${offer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      },
      body: JSON.stringify(offer)
    })
      .then(response => response.json())

    return response
  }

  async deleteJobOffer(offer: jobOffer) {

    const response = await fetch(this.apiUrl + `/${offer.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      }
    })
      .then(response => response.json())

    return response
  }

}