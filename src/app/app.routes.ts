import { Routes } from '@angular/router';
import { JobOffersPage } from './components/job-offers-page/job-offers-page';
import { JobOfferDetailsPage } from './components/job-offer-details-page/job-offer-details-page';
import { JobOfferApplicationPage } from './components/job-offer-application-page/job-offer-application-page';
import { RecruiterOffersPage } from './components/recruiter/offers-page/offers-page';
import { RecruiterOfferDetailsPage } from './components/recruiter/offer-details-page/offer-details-page';
import { RecruiterEditOfferPage } from './components/recruiter/edit-offer-page/recruiter-edit-offer-page';
import { RecruiterCreateOfferPage } from './components/recruiter/create-offer-page/recruiter-create-offer-page';
import { RecruiterOfferApplicationsPage } from './components/recruiter/offer-applications-page/recruiter-offer-applications-page';
import { RecruiterOfferApplicationDetailsPage } from './components/recruiter/offer-application-details-page/recruiter-offer-application-details-page';

export const routes: Routes = [

  {
    path: "",
    redirectTo: "offers",
    pathMatch: "full"
  },

  {
    path: "offers",
    children: [
      {
        path: "",
        component: JobOffersPage
      },
      {
        path: ":offerId",
        component: JobOfferDetailsPage
      },
      {
        path: ":offerId/apply",
        component: JobOfferApplicationPage
      },
    ]
  },

  {
    path: "recruiter",
    redirectTo: "recruiter/offers",
    pathMatch: "full"
  },

  {
    path: "recruiter/offers",
    children: [
      {
        path: "",
        component: RecruiterOffersPage
      },
      {
        path: "create",
        component: RecruiterCreateOfferPage
      },
      {
        path: ":offerId",
        component: RecruiterOfferDetailsPage
      },
      {
        path: ":offerId/edit",
        component: RecruiterEditOfferPage
      },
      {
        path: ":offerId/applications",
        component: RecruiterOfferApplicationsPage
      },
      {
        path: ":offerId/applications/:applicationId",
        component: RecruiterOfferApplicationDetailsPage
      },
    ]
  }
];
