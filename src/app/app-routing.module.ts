import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/Util-components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/User-components/login-page/login-page.component';
import { RegisterPageComponent } from './components/User-components/register-page/register-page.component';
import { OfficialCategoriesPageComponent } from './components/test-components/official-categories-page/official-categories-page.component';
import { OfficialTestPageComponent } from './components/test-components/official-test-page/official-test-page.component';
import { ForgotPasswordComponent } from './components/User-components/forgot-password/forgot-password.component';
import { UserAccountComponent } from './components/User-components/user-account/user-account.component';
import { EducationMaterialsComponent } from './components/Util-components/education-materials/education-materials.component';
import { ConstructorSelectComponent } from "./components/test-components/constructor-select/constructor-select.component";
import { TestHistoryPageComponent } from './components/test-components/test-history-page/test-history-page.component';
import { JsonTestConstructorPageComponent } from './components/test-components/json-test-constructor-page/json-test-constructor-page.component';
import { CustomTestConstructorPageComponent } from './components/test-components/custom-test-constructor-page/custom-test-constructor-page.component';
import { IconSelectorComponent } from './components/Util-components/icon-selector/icon-selector.component';
import { NotFoundPageComponent } from './components/Util-components/not-found-page/not-found-page.component';
const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'landing-page', component: LandingPageComponent },
    {
        path: 'official-categories/:subCat',
        component: OfficialCategoriesPageComponent,
    },
    {
        path: 'official-test/:subCat/:year',
        component: OfficialTestPageComponent,
    },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'user-account', component: UserAccountComponent },
    { path: 'education-materials', component: EducationMaterialsComponent },
    { path: 'test-history', component: TestHistoryPageComponent },
    {
        path: 'json-constructor',
        component: JsonTestConstructorPageComponent,
    },
    {
        path: 'custom-constructor',
        component: CustomTestConstructorPageComponent,
    },
    { path: 'icon-selector', component: IconSelectorComponent },
    { path: 'constructor-select', component: ConstructorSelectComponent },
    { path: '**', component: NotFoundPageComponent },
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
    OfficialCategoriesPageComponent,
    OfficialTestPageComponent,
    EducationMaterialsComponent,
    TestHistoryPageComponent,
    JsonTestConstructorPageComponent,
    CustomTestConstructorPageComponent,
    IconSelectorComponent,
    NotFoundPageComponent,
    ConstructorSelectComponent,
];
