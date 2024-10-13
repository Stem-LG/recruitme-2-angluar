import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";




@Injectable()
export class JobApplicationService {

  route = inject(ActivatedRoute)

  apiUrl = "http://localhost:3000";

  jobApplication: jobApplication | null = null

  applicationId: number;

  constructor() {

    this.applicationId = this.route.snapshot.params['applicationId']

    this.fetchJobApplication()

  }

  fetchJobApplication() {

    fetch(this.apiUrl + "/application/" + this.applicationId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.jobApplication = {
          ...data,
          createdAt: new Date(data.createdAt)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  acceptApplication() {
    fetch(this.apiUrl + "/application", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...this.jobApplication,
        status: "accepted"
      })
    }).then(_ => {
      this.jobApplication = {
        ...this.jobApplication!,
        status: "accepted"
      }
    }).catch(error => {
      console.error(error)
    })
  }

  rejectApplication() {
    fetch(this.apiUrl + "/application", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...this.jobApplication,
        status: "rejected"
      })
    }).then(_ => {
      this.jobApplication = {
        ...this.jobApplication!,
        status: "rejected"
      }
    }).catch(error => {
      console.error(error)
    })
  }

}