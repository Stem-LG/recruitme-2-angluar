import { Injectable, signal } from "@angular/core";




@Injectable()
export class JobOffersService {

  apiUrl = "http://localhost:3000/offers";

  jobOffers: jobOffer[] = []

  pageInfo = signal(
    {
      number: 0,
      size: 5,
      totalElements: 0,
      totalPages: 0
    }
  )

  constructor() {
    this.fetchJobOffers()
  }

  fetchJobOffers() {
    fetch(this.apiUrl + `?page=${this.pageInfo().number}&size=${this.pageInfo().size}&sort=id,desc`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.jobOffers = data._embedded.jobOffers.map((offer: jobOffer) => (
          {
            ...offer,
            createdAt: new Date(offer.createdAt)
          }
        ))

        this.pageInfo.set(data.page)

        console.table(
          this.jobOffers
        )
        console.table(
          this.pageInfo
        )
      })
      .catch(error => {
        console.error(error)
      })
  }

  changePage(page: number) {
    this.pageInfo.set({ ...this.pageInfo(), number: page })
    this.fetchJobOffers()
  }


}