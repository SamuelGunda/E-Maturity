import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { environment } from './environments/environment';
import { HeaderComponent } from './components/Util-components/header/header.component';
import { NavbarComponent } from './components/Util-components/navbar/navbar.component';
import { NgOptimizedImage } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { provideFirebaseApp } from '@angular/fire/app';
import firebase from 'firebase/compat/app';
import initializeApp = firebase.initializeApp;
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IconSelectorComponent } from './components/Util-components/icon-selector/icon-selector.component';
import { OfficialTestPageComponent } from './components/test-components/official-test-page/official-test-page.component';
import { OfficialCategoriesPageComponent } from './components/test-components/official-categories-page/official-categories-page.component';
import { TestHistoryPageComponent } from './components/test-components/test-history-page/test-history-page.component';
import {
  CookieService,
  CookieOptionsProvider,
  CookieOptions,
  CookieModule,
} from 'ngx-cookie';
import { AuthService } from './service/auth-serivce/auth.service';
import { OfficialTestConstructorPageComponent } from './components/test-components/official-test-constructor-page/official-test-constructor-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    routingComponent,
    IconSelectorComponent,
    OfficialTestPageComponent,
    OfficialCategoriesPageComponent,
    TestHistoryPageComponent,
    OfficialTestConstructorPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    // FirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    AngularFireAuthModule,
    NgOptimizedImage,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    CookieModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    CookieService,
    { provide: CookieOptionsProvider, useValue: {} as CookieOptions },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
