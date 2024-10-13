import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ChevronLeft, LucideAngularModule } from 'lucide-angular';
import { RecruiterJobOfferService } from '../../../services/recruiter/job-offer';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'recruiter-create-offer-page',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, ReactiveFormsModule],
  providers: [RecruiterJobOfferService],
  templateUrl: './recruiter-create-offer-page.html',
})
export class RecruiterCreateOfferPage {

  recruiterJobOfferService = inject(RecruiterJobOfferService);

  router = inject(Router)

  readonly ChevronLeft = ChevronLeft;

  newOfferForm = new FormGroup({
    title: new FormControl(''),
    company: new FormControl(''),
    skills: new FormControl(''),
    description: new FormControl(''),
  });

  async submitOffer() {

    this.recruiterJobOfferService.createJobOffer({
      title: this.newOfferForm.get('title')?.value!,
      company: this.newOfferForm.get('company')?.value!,
      skills: this.newOfferForm.get('skills')?.value!,
      description: this.newOfferForm.get('description')?.value!,
    }).then(() => {
      this.router.navigate(['/recruiter/offers']);
    });
  }

}
