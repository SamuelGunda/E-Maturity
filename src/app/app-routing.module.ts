import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/Util-components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/User-components/login-page/login-page.component';
import { RegisterPageComponent } from './components/User-components/register-page/register-page.component';
import { YearsPageComponent } from './components/test-components/years-page/years-page.component';
import { TestPageComponent } from './components/test-components/test-page/test-page.component';
import { ForgotPasswordComponent } from './components/User-components/forgot-password/forgot-password.component';
import { UserAccountComponent } from './components/User-components/user-account/user-account.component';
import { EducationMaterialsComponent } from './components/Util-components/education-materials/education-materials.component';
import { SavedTestsPageComponent } from './components/test-components/saved-tests-page/saved-tests-page.component';

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
  { path: 'saved-tests-page', component: SavedTestsPageComponent },
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
