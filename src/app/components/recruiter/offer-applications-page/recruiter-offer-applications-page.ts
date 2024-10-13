import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChevronLeft, LucideAngularModule } from 'lucide-angular';
import { JobApplicationsService } from '../../../services/job-applications';

@Component({
  selector: 'recruiter-offer-applications-page',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  providers: [JobApplicationsService],
  templateUrl: './recruiter-offer-applications-page.html',
})
export class RecruiterOfferApplicationsPage {


  jobApplicationsService = inject(JobApplicationsService)


  readonly ChevronLeft = ChevronLeft;
}