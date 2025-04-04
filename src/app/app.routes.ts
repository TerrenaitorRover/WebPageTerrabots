import { Routes } from '@angular/router';
import { HomeComponent } from './components/body/home/home.component';
import { ProjectsComponent } from './components/body/projects/projects.component';
import { TeamComponent } from './components/body/team/team.component';
import { AboutComponent } from './components/body/about/about.component';
import { SponsorsComponent } from './components/body/sponsors/sponsors.component';
import { EventsComponent } from './components/body/events/events.component';
import { ContactComponent } from './components/body/contact/contact.component';
import { PrivacyPolicyComponent } from './components/body/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './components/body/terms-conditions/terms-conditions.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent},
    { path: 'projects', component: ProjectsComponent},
    { path: 'team', component: TeamComponent},
    { path: 'sponsors', component: SponsorsComponent},
    { path: 'events', component: EventsComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'privacypolicy', component: PrivacyPolicyComponent},
    { path: 'termsConditions', component: TermsConditionsComponent}
];
