import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChevronLeft, LucideAngularModule } from 'lucide-angular';
import { JobApplicationService } from '../../../services/job-application';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppBarComponent } from "../../../components/app-bar/app-bar";

@Component({
  selector: 'recruiter-offer-application-details-page',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, PdfViewerModule, AppBarComponent],
  providers: [JobApplicationService],
  templateUrl: './recruiter-offer-application-details-page.html',
})

export class RecruiterOfferApplicationDetailsPage {

  jobApplicationService = inject(JobApplicationService)

  readonly ChevronLeft = ChevronLeft;
}