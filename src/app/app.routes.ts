import { Routes } from '@angular/router';

import { AdmissionPageComponent } from './pages/admission/admission-page.component';
import { AdmissionThankYouPageComponent } from './pages/admission-thank-you/admission-thank-you-page.component';
import { AboutUsPageComponent } from './pages/about-us/about-us-page.component';
import { ContactUsPageComponent } from './pages/contact-us/contact-us-page.component';
import { CoursesPageComponent } from './pages/courses/courses-page.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { LegalPageComponent } from './pages/legal/legal-page.component';
import { LiveClassesPageComponent } from './pages/live-classes/live-classes-page.component';
import { ResultsPageComponent } from './pages/results/results-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomePageComponent },
  { path: 'courses', component: CoursesPageComponent },
  { path: 'live-classes', component: LiveClassesPageComponent },
  { path: 'results', component: ResultsPageComponent },
  { path: 'admission', component: AdmissionPageComponent },
  { path: 'admission/thank-you', component: AdmissionThankYouPageComponent },
  { path: 'about-us', component: AboutUsPageComponent },
  { path: 'contact-us', component: ContactUsPageComponent },
  { path: 'privacy-policy', component: LegalPageComponent, data: { kind: 'privacy' } },
  { path: 'terms-of-service', component: LegalPageComponent, data: { kind: 'terms' } },
  { path: '**', redirectTo: 'home' }
];
