import { Injectable, signal } from "@angular/core";




@Injectable()
export class JobOffersService {

  apiUrl = "http://localhost:3000/offers";

  jobOffers: jobOffer[] = []

  pageInfo = signal<
    {
      disabled: boolean,
      number: number,
      size: number,
      totalElements: number,
      totalPages: number
    }
  >(
    {
      disabled: false,
      number: 0,
      size: 5,
      totalElements: 0,
      totalPages: 0
    }
  )

  sortConfig = signal<
    {
      column: string,
      direction: string
    }
  >({
    column: "id",
    direction: "asc"
  })

  constructor() {
    this.fetchJobOffers()
  }

  fetchJobOffers() {
    fetch(this.apiUrl + `?page=${this.pageInfo().number}&size=${this.pageInfo().size}&sort=${this.sortConfig().column},${this.sortConfig().direction}`, {
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

        this.pageInfo.set({ ...data.page, disabled: false })

      })
      .catch(error => {
        console.error(error)
      })
  }

  fetchJobOffersBySkill(skill: string) {
    fetch(this.apiUrl + `/search/?skill=${skill}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.jobOffers = data.map((offer: jobOffer) => (
          {
            ...offer,
            createdAt: new Date(offer.createdAt)
          }
        ))

        this.pageInfo.update(prev => ({ ...prev, disabled: true }))

      })
      .catch(error => {
        console.error(error)
      })
  }

  sortResults(column: string) {

    if (column == this.sortConfig().column) {
      this.sortConfig.update((prev) => ({
        ...prev,
        direction: this.sortConfig().direction == "desc" ? "asc" : "desc"
      }))
    } else {
      this.sortConfig.set({
        column,
        direction: "asc"
      })
    }

    this.fetchJobOffers()
  }

  changePage(page: number) {
    this.pageInfo.set({ ...this.pageInfo(), number: page })
    this.fetchJobOffers()
  }


}