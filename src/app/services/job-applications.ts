import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";




@Injectable()
export class JobApplicationsService {

  route = inject(ActivatedRoute)

  apiUrl = "http://localhost:3000";

  jobApplications: jobApplication[] = []

  offerId: number;

  constructor() {

    this.offerId = this.route.snapshot.params['offerId']

    this.fetchJobApplications()
  }

  fetchJobApplications() {

    fetch(this.apiUrl + "/applications/" + this.offerId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.jobApplications = data.map((application: jobApplication) => (
          {
            ...application,
            createdAt: new Date(application.createdAt)
          }
        ))
      })
      .catch(error => {
        console.error(error)
      })
  }


}