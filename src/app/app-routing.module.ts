import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PetEntryComponent } from './pet-entry/pet-entry.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  {path:'login', component: LoginComponent},
  { path: 'pet-entry', component: PetEntryComponent },
  {path:'**', component: PageNotFoundComponent},
  { path: '', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
