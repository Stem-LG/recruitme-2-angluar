import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobOffersService } from '../../services/job-offers';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'job-offers-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  providers: [JobOffersService],
  templateUrl: './job-offers-page.html',
})
export class JobOffersPage {

  jobOffersService = inject(JobOffersService)

  pages = computed(() => {
    const { totalPages } = this.jobOffersService.pageInfo()
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  })

  skillSearchValue: string = "";

  onSearchClick() {

    if (this.skillSearchValue != "") {
      this.jobOffersService.fetchJobOffersBySkill(this.skillSearchValue)
    } else {
      this.jobOffersService.fetchJobOffers()
    }

  }

  goToPage(page: number) {
    this.jobOffersService.changePage(page - 1)
  }

  previousPage() {
    this.jobOffersService.changePage(this.jobOffersService.pageInfo().number - 1)
  }

  nextPage() {
    this.jobOffersService.changePage(this.jobOffersService.pageInfo().number + 1)
  }

}