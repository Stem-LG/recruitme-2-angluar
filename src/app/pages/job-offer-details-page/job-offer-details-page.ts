import { Component, inject } from '@angular/core';
import { ChevronLeft, Lock, LucideAngularModule } from 'lucide-angular';
import { JobOfferService } from '../../services/job-offer';
import { AppBarComponent } from "../../components/app-bar/app-bar";
import { JobOfferDetailsSectionComponent } from "../../components/job-offer-details-section/job-offer-details-section";
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'job-offer-details-page',
  standalone: true,
  imports: [LucideAngularModule, AppBarComponent, JobOfferDetailsSectionComponent],
  providers: [JobOfferService],
  templateUrl: './job-offer-details-page.html',
})
export class JobOfferDetailsPage {

  readonly ChevronLeft = ChevronLeft;
  readonly Lock = Lock;

  jobOfferService = inject(JobOfferService)

  keycloak = inject(KeycloakService);


}
