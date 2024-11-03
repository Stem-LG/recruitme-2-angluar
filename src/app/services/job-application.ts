import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "./auth";




@Injectable()
export class JobApplicationService {

  authService = inject(AuthService)
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
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
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
    fetch(this.apiUrl + `/application/${this.applicationId}/status?status=${status}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
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