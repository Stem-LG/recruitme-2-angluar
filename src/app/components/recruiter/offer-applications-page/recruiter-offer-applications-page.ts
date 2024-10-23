import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChevronLeft, LucideAngularModule } from 'lucide-angular';
import { JobApplicationsService } from '../../../services/job-applications';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'recruiter-offer-applications-page',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, FormsModule],
  providers: [JobApplicationsService],
  templateUrl: './recruiter-offer-applications-page.html',
})
export class RecruiterOfferApplicationsPage {


  jobApplicationsService = inject(JobApplicationsService)

  readonly ChevronLeft = ChevronLeft;

  statusFilterValue = signal("all");
  searchQueryValue: string = "";

  filteredJobApplications = computed(() => this.jobApplicationsService.jobApplications().filter((application) => { return this.statusFilterValue() == "all" || application.status == this.statusFilterValue() }))

  onStatusFilterChange(e: any) {
    this.statusFilterValue.set(e.target.value)
  }

  onSearchClick() {

    if (this.searchQueryValue != "") {
      this.jobApplicationsService.searchJobApplications(this.searchQueryValue)
    } else {
      this.jobApplicationsService.fetchJobApplications()
    }

  }
}