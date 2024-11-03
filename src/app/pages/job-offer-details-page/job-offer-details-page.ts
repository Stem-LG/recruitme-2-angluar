import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChevronLeft, Lock, LucideAngularModule } from 'lucide-angular';
import { JobOfferService } from '../../services/job-offer';
import { AppBarComponent } from "../../components/app-bar/app-bar";
import { AuthService } from '../../services/auth';

@Component({
  selector: 'job-offer-details-page',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, AppBarComponent],
  providers: [JobOfferService, AuthService],
  templateUrl: './job-offer-details-page.html',
})
export class JobOfferDetailsPage {

  readonly ChevronLeft = ChevronLeft;
  readonly Lock = Lock;

  jobOfferService = inject(JobOfferService)

  authService = inject(AuthService);


}
