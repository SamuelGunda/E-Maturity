// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponent } from './app-routing.module';

import { environment } from './environments/environment';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgOptimizedImage } from "@angular/common";
import { YearsPageComponent } from './years-page/years-page.component';

import {HttpClientModule} from "@angular/common/http";
import {provideFirebaseApp} from "@angular/fire/app";
import firebase from "firebase/compat/app";
import initializeApp = firebase.initializeApp;
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import { TestPageComponent } from './test-page/test-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    routingComponent,
    YearsPageComponent,
    TestPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    // FirestoreModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    // AngularFireAuthModule,
    NgOptimizedImage,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
