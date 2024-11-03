import { Routes } from '@angular/router';
import { JobOffersPage } from './pages/job-offers-page/job-offers-page';
import { JobOfferDetailsPage } from './pages/job-offer-details-page/job-offer-details-page';
import { JobOfferApplicationPage } from './pages/job-offer-application-page/job-offer-application-page';
import { RecruiterOffersPage } from './pages/recruiter/offers-page/offers-page';
import { RecruiterOfferDetailsPage } from './pages/recruiter/offer-details-page/offer-details-page';
import { RecruiterEditOfferPage } from './pages/recruiter/edit-offer-page/recruiter-edit-offer-page';
import { RecruiterCreateOfferPage } from './pages/recruiter/create-offer-page/recruiter-create-offer-page';
import { RecruiterOfferApplicationsPage } from './pages/recruiter/offer-applications-page/recruiter-offer-applications-page';
import { RecruiterOfferApplicationDetailsPage } from './pages/recruiter/offer-application-details-page/recruiter-offer-application-details-page';
import { LoginPage } from './pages/auth/login/login-page';
import { ForbiddenPage } from './pages/forbidden/forbidden-page';
import { AuthGuard } from './app.guard';
import { RegisterPage } from './pages/auth/register/register-page';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth';




export const routes: Routes = [

  {
    path: "",
    resolve: {
      redirect: () => {
        const authService = inject(AuthService);
        const router = inject(Router);

        const user = authService.getUser();
        if (!user || user.role === 'USER') {
          return router.navigate(['/offers']);
        }

        return router.navigate(['/recruiter/offers']);
      }
    },
    pathMatch: "full",
    component: JobOffersPage
  },
  {
    path: "forbidden",
    component: ForbiddenPage
  },
  {
    path: "login",
    component: LoginPage,
    canActivate: [AuthGuard],
    data: { requiresAuth: false }
  },
  {
    path: "register",
    component: RegisterPage,
    canActivate: [AuthGuard],
    data: { requiresAuth: false }
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
        component: JobOfferApplicationPage,
        canActivate: [AuthGuard],
        data: { role: 'USER' }
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
    canActivate: [AuthGuard],
    data: { role: 'RECRUITER' },
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
