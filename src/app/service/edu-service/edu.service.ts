import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs } from '@angular/fire/firestore';
import { Observable, forkJoin, from, map } from 'rxjs';

Injectable({
  providedIn: 'root'
})
export interface eduMaterials {
  id: string;
  text: string;
  url: string;
}
export class EduService {
  constructor(private firestore: Firestore) { }

  getFile(subject: string): Observable<eduMaterials[]> {
    const dataCollection = collection(this.firestore, 'edu_materials');
    const documentRef = doc(dataCollection, 'Subjects');
    const sjlCollectionRef = collection(documentRef, 'SJL');
    const anjCollectionRef = collection(documentRef, 'ANJ');
  
    return forkJoin([
      from(
        getDoc(documentRef).then((snapshot) => {
          if (snapshot.exists()) {
            return snapshot.id;
          } else {
            throw new Error('Document not found');
          }
        }),
      ),
      from(
        getDocs(sjlCollectionRef).then((querySnapshot) => {
          const materials: eduMaterials[] = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              text: doc.data()['text'],
              url: doc.data()['url'],
            } as eduMaterials;
          });
          return materials.sort((a, b) => a.id.localeCompare(b.id));
        }),
      ),
      from(
        getDocs(anjCollectionRef).then((querySnapshot) => {
          const materials: eduMaterials[] = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              text: doc.data()['text'],
              url: doc.data()['url'],
            } as eduMaterials;
          });
          return materials.sort((a, b) => a.id.localeCompare(b.id));
        }),
      ),
    ]).pipe(
      map(([documentId, sjlMaterials, anjMaterials]) => {
        // Vráti pole materiálov pre obe kolekcie
        return [...sjlMaterials, ...anjMaterials];
      }),
    );
  }  
}  