import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChevronLeft, LucideAngularModule } from 'lucide-angular';
import { JobOfferService } from '../../services/job-offer';

@Component({
  selector: 'job-offer-details-page',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  providers: [JobOfferService],
  templateUrl: './job-offer-details-page.html',
})
export class JobOfferDetailsPage {

  readonly ChevronLeft = ChevronLeft;

  jobOfferService = inject(JobOfferService)


}
