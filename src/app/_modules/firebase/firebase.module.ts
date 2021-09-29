import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp, FirebaseAppModule } from '@angular/fire/app';
import { getStorage, provideStorage, StorageModule } from '@angular/fire/storage';
import { enableIndexedDbPersistence, FirestoreModule, getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const firestore = getFirestore();
      enableIndexedDbPersistence(firestore);
      return firestore;
    }),
    provideStorage(() => getStorage()),
  ],
  exports: [
    // FirebaseAppModule,
    // FirestoreModule,
    // StorageModule
  ]
})
export class FirebaseModule { }
