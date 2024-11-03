import { inject, Injectable, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "./auth";




@Injectable()
export class JobOfferService {

  authService = inject(AuthService)

  route = inject(ActivatedRoute)

  apiUrl = "http://localhost:3000";

  jobOffer = signal<jobOffer | null>(null)


  constructor() {
    this.fetchJobOffer()
  }

  fetchJobOffer() {

    const id = this.route.snapshot.params['offerId']

    fetch(this.apiUrl + `/offers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.jobOffer.set({
          ...data,
          createdAt: new Date(data.createdAt)
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  async uploadResume(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(this.apiUrl + `/file`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.authService.getToken()}`
      },
      body: formData
    })

    return response.json()
  }


  async applyForJob(
    {
      name,
      email,
      resumeUrl,
      motivation
    }: {
      name: string,
      email: string,
      resumeUrl: string,
      motivation: string
    }
  ) {

    const savedApplication = await fetch(this.apiUrl + `/application`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      },
      body: JSON.stringify({
        name,
        email,
        resumeUrl,
        motivation,
        jobOffer: { id: this.jobOffer()?.id }
      })
    })

    return savedApplication.json()
  }

}