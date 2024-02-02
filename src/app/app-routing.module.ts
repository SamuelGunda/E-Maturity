import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { YearsPageComponent } from './years-page/years-page.component';
import { TestPageComponent } from './test-page/test-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { EducationMaterialsComponent } from './education-materials/education-materials.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'years-page/:subCat', component: YearsPageComponent },
  { path: 'test-page/:subCat/:year', component: TestPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'user-account', component: UserAccountComponent },
  { path: 'education-materials', component: EducationMaterialsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponent = [
  LandingPageComponent,
  LoginPageComponent,
  RegisterPageComponent,
  LandingPageComponent,
  ForgotPasswordComponent,
  UserAccountComponent,
  TestPageComponent,
  YearsPageComponent,
  EducationMaterialsComponent,
];
