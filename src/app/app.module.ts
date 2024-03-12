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
import { SavedTestsPageComponent } from './components/test-components/saved-tests-page/saved-tests-page.component';
import { IconSelectorComponent } from './components/Util-components/icon-selector/icon-selector.component';
import { TestPageComponent } from './components/test-components/test-page/test-page.component';
import { TimeFormatPipe } from './service/timer-service/time-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    routingComponent,
    SavedTestsPageComponent,
    IconSelectorComponent,
    TimeFormatPipe,
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
