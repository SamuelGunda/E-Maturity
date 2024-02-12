// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { environment } from './environments/environment';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgOptimizedImage } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { provideFirebaseApp } from '@angular/fire/app';
import firebase from 'firebase/compat/app';
import initializeApp = firebase.initializeApp;
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SavedTestsPageComponent } from './saved-tests-page/saved-tests-page.component';
import { IconSelectorComponent } from './icon-selector/icon-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    routingComponent,
    ModalWindowComponent,
    SavedTestsPageComponent,
    IconSelectorComponent,
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
  ],
  providers: [TestPageComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
