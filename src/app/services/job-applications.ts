import { inject, Injectable, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthenticatedFetchService } from "./authenticatedFetch";




@Injectable()
export class JobApplicationsService {

  route = inject(ActivatedRoute)

  authFetch = inject(AuthenticatedFetchService)

  apiUrl = "http://localhost:3000";

  jobApplications = signal<jobApplication[]>([])

  offerId: number;

  constructor() {

    this.offerId = this.route.snapshot.params['offerId']

    this.fetchJobApplications()
  }

  fetchJobApplications() {

    this.authFetch.fetch(this.apiUrl + "/applications/" + this.offerId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

    this.authFetch.fetch(this.apiUrl + "/applications/" + this.offerId + "/search?name=" + query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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