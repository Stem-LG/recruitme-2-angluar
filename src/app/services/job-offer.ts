import { inject, Injectable, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";




@Injectable()
export class JobOfferService {

  apiUrl = "http://localhost:3000";

  jobOffer = signal<jobOffer | null>(null)

  route = inject(ActivatedRoute)

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

      body: formData
    })

    console.log(response)

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
        'Content-Type': 'application/json'
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