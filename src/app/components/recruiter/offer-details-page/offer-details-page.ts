import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChevronLeft, LucideAngularModule } from 'lucide-angular';
import { JobOfferService } from '../../../services/job-offer';
import { RecruiterJobOfferService } from '../../../services/recruiter/job-offer';

@Component({
  selector: 'recruiter-offer-details-page',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  providers: [JobOfferService, RecruiterJobOfferService],
  templateUrl: './offer-details-page.html',
})

export class RecruiterOfferDetailsPage {

  readonly ChevronLeft = ChevronLeft;

  jobOfferService = inject(JobOfferService)
  recruiterJobOfferService = inject(RecruiterJobOfferService)
  router = inject(Router)


  deleteOffer() {
    this.recruiterJobOfferService.deleteJobOffer(this.jobOfferService.jobOffer()!).then(() => {
      this.router.navigate(['/recruiter/offers']);
    });
  }

}