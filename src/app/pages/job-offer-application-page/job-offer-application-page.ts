import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChevronLeft, LucideAngularModule } from 'lucide-angular';
import { JobOfferService } from '../../services/job-offer';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppBarComponent } from "../../components/app-bar/app-bar";
import { AuthService } from '../../services/auth';

@Component({
  selector: 'job-offer-application-page',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, ReactiveFormsModule, AppBarComponent],
  providers: [JobOfferService, AuthService],
  templateUrl: './job-offer-application-page.html',
})
export class JobOfferApplicationPage {

  jobOfferService = inject(JobOfferService)

  authService = inject(AuthService);

  readonly ChevronLeft = ChevronLeft;

  applicationForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(this.authService.user()?.email),
    resume: new FormControl<File | null>(null),
    motivation: new FormControl(''),
  });

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.item(0);
    this.applicationForm.patchValue({
      resume: file,
    });
  }


  success = false;

  async submitApplication() {

    //upload resume

    const fileUrl = await this.jobOfferService.uploadResume(this.applicationForm.get('resume')?.value!);

    //send application

    this.jobOfferService.applyForJob({
      name: this.applicationForm.get('name')?.value!,
      email: this.applicationForm.get('email')?.value!,
      resumeUrl: fileUrl.fileDownloadUri,
      motivation: this.applicationForm.get('motivation')?.value!,
    }).then(() => {
      this.success = true;
      this.applicationForm.reset();
      setTimeout(() => {
        this.success = false;
      }, 5000);
    }
    );

  }

}