import { Routes } from '@angular/router';

import { adminAuthGuard, adminGuestGuard } from './admin/admin-auth.guards';
import { AdminLoginPageComponent } from './admin/admin-login-page.component';
import { AdminPageComponent } from './admin/admin-page.component';
import { AdmissionPageComponent } from './pages/admission/admission-page.component';
import { AdmissionThankYouPageComponent } from './pages/admission-thank-you/admission-thank-you-page.component';
import { AboutUsPageComponent } from './pages/about-us/about-us-page.component';
import { ContactUsPageComponent } from './pages/contact-us/contact-us-page.component';
import { CoursesPageComponent } from './pages/courses/courses-page.component';
import { BlogsPageComponent } from './pages/blogs/blogs-page.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { LegalPageComponent } from './pages/legal/legal-page.component';
import { LiveClassesPageComponent } from './pages/live-classes/live-classes-page.component';
import { ResultsPageComponent } from './pages/results/results-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'home', pathMatch: 'full', redirectTo: '' },
  { path: 'admin/login', component: AdminLoginPageComponent, canActivate: [adminGuestGuard] },
  { path: 'admin', component: AdminPageComponent, canActivate: [adminAuthGuard] },
  { path: 'courses', component: CoursesPageComponent },
  { path: 'blogs', component: BlogsPageComponent },
  { path: 'live-classes', component: LiveClassesPageComponent },
  { path: 'results', component: ResultsPageComponent },
  { path: 'admission', component: AdmissionPageComponent },
  { path: 'admission/thank-you', component: AdmissionThankYouPageComponent },
  { path: 'about-us', component: AboutUsPageComponent },
  { path: 'contact-us', component: ContactUsPageComponent },
  { path: 'privacy-policy', component: LegalPageComponent, data: { kind: 'privacy' } },
  { path: 'terms-of-service', component: LegalPageComponent, data: { kind: 'terms' } },
  { path: '**', redirectTo: '' }
];
