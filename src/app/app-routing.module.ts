import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamDetailsComponent } from './team-details/team-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'results/:teamCode', component: TeamDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
