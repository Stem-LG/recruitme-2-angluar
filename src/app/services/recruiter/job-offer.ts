import { Injectable } from "@angular/core";



@Injectable()
export class RecruiterJobOfferService {

  apiUrl = "http://localhost:3000";

  async createJobOffer(offer: {
    title: string,
    company: string,
    skills: string,
    description: string
  }) {

    const response = await fetch(this.apiUrl + "/offers", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(offer)
    })
      .then(response => response.json())

    return response

  }

  async updateJobOffer(offer: jobOffer) {

    const response = await fetch(this.apiUrl + `/offers/${offer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(offer)
    })
      .then(response => response.json())

    return response
  }

  async deleteJobOffer(offer: jobOffer) {

    const response = await fetch(this.apiUrl + `/offers/${offer.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())

    return response
  }

}