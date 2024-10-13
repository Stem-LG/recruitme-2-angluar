import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobOffersService } from '../../../services/job-offers';

@Component({
  selector: 'recruiter-offers-page',
  standalone: true,
  imports: [RouterLink],
  providers: [JobOffersService],
  templateUrl: './offers-page.html',
})
export class RecruiterOffersPage {

  jobOffersService = inject(JobOffersService)

  pages = computed(() => {
    const { totalPages } = this.jobOffersService.pageInfo()
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  })

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
