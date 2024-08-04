import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

function provideServiceWorker(js: string, param2: { registrationStrategy: string; enabled: boolean }) {
  return undefined;
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideFirebaseApp(() => initializeApp({
    "projectId": "ng-my-notes-d0537",
    "appId": "1:264519817956:web:8932330f72b2c2a314eaf1",
    "storageBucket": "ng-my-notes-d0537.appspot.com",
    "apiKey": "AIzaSyCeKt46qm_YQztLraOyhVCMMl2BvkBEz50",
    "authDomain": "ng-my-notes-d0537.firebaseapp.com",
    "messagingSenderId": "264519817956"
  })), provideAuth(() => getAuth()), provideAnimationsAsync(),
    provideFirestore(() => getFirestore())]
};
