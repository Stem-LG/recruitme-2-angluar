import { inject, Injectable, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "./auth";




@Injectable()
export class JobApplicationsService {

  authService = inject(AuthService)
  route = inject(ActivatedRoute)

  apiUrl = "http://localhost:3000";

  jobApplications = signal<jobApplication[]>([])

  offerId: number;

  constructor() {

    this.offerId = this.route.snapshot.params['offerId']

    this.fetchJobApplications()
  }

  fetchJobApplications() {

    fetch(this.apiUrl + "/applications/" + this.offerId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      }
    })
      .then(response => response.json())
      .then(data => {
        this.jobApplications.set(data.map((application: jobApplication) => (
          {
            ...application,
            createdAt: new Date(application.createdAt)
          }
        )))
      })
      .catch(error => {
        console.error(error)
      })
  }

  searchJobApplications(query: string) {

    fetch(this.apiUrl + "/applications/" + this.offerId + "/search?name=" + query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      }
    })
      .then(response => response.json())
      .then(data => {
        this.jobApplications.set(data.map((application: jobApplication) => (
          {
            ...application,
            createdAt: new Date(application.createdAt)
          }
        )))
      })
      .catch(error => {
        console.error(error)
      })
  }


}