import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthenticatedFetchService } from "./authenticatedFetch";




@Injectable()
export class JobApplicationService {

  route = inject(ActivatedRoute)

  authFetch = inject(AuthenticatedFetchService)

  apiUrl = "http://localhost:3000";

  jobApplication: jobApplication | null = null

  applicationId: number;

  constructor() {

    this.applicationId = this.route.snapshot.params['applicationId']

    this.fetchJobApplication()

  }

  fetchJobApplication() {

    this.authFetch.fetch(this.apiUrl + "/application/" + this.applicationId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
    this.changeStatus("accepted")
  }

  pendingApplication() {
    this.changeStatus("pending")
  }

  rejectApplication() {
    this.changeStatus("rejected")
  }

  changeStatus(status: "accepted" | "pending" | "rejected") {
    this.authFetch.fetch(this.apiUrl + `/application/${this.applicationId}/status?status=${status}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(_ => {
      this.jobApplication = {
        ...this.jobApplication!,
        status
      }
    }).catch(error => {
      console.error(error)
    })
  }

}