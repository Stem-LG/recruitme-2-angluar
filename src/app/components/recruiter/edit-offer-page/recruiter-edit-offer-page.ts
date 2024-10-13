import { Component, effect, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChevronLeft, LucideAngularModule } from 'lucide-angular';
import { JobOfferService } from '../../../services/job-offer';
import { RecruiterJobOfferService } from '../../../services/recruiter/job-offer';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'recruiter-edit-offer-page',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, ReactiveFormsModule],
  providers: [JobOfferService, RecruiterJobOfferService],
  templateUrl: './recruiter-edit-offer-page.html',
})
export class RecruiterEditOfferPage {

  jobOfferService = inject(JobOfferService)
  recruiterJobOfferService = inject(RecruiterJobOfferService)
  router = inject(Router)


  readonly ChevronLeft = ChevronLeft;

  editOfferForm = new FormGroup({
    title: new FormControl(''),
    company: new FormControl(''),
    skills: new FormControl(''),
    description: new FormControl(''),
  });

  constructor() {
    effect(() => {
      this.editOfferForm.patchValue({
        title: this.jobOfferService.jobOffer()?.title,
        company: this.jobOfferService.jobOffer()?.company,
        skills: this.jobOfferService.jobOffer()?.skills,
        description: this.jobOfferService.jobOffer()?.description,
      });
    })
  }

  updateOffer() {

    this.recruiterJobOfferService.updateJobOffer(
      {
        ...this.jobOfferService.jobOffer()!,
        title: this.editOfferForm.get('title')?.value!,
        company: this.editOfferForm.get('company')?.value!,
        skills: this.editOfferForm.get('skills')?.value!,
        description: this.editOfferForm.get('description')?.value!,
      }
    ).then(() => {
      this.router.navigate(['/recruiter/offers/' + this.jobOfferService.jobOffer()?.id]);
    });
  }

}
