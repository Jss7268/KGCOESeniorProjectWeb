import { SignupComponent } from './components/signup/signup.component';
import { ExperimentsComponent } from './components/experiments/experiments.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'experiments', component: ExperimentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
