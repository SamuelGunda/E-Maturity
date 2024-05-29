import { Injectable } from '@angular/core';
import {
    Firestore,
    collection,
    doc,
    getDoc,
    getDocs,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

export interface eduMaterials {
    id: string;
    text: string;
    url: string;
}
@Injectable({
    providedIn: 'root',
})
export class EduService {
    constructor(private firestore: Firestore) {}

    getFile(subject: string): Observable<eduMaterials[]> {
        const dataCollection = collection(this.firestore, 'edu_materials');
        const documentRef = doc(dataCollection, 'Subjects');
        const subjectCollectionRef = collection(documentRef, subject);

        return (
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
                getDocs(subjectCollectionRef).then((querySnapshot) => {
                    const materials: eduMaterials[] = querySnapshot.docs.map(
                        (doc) => {
                            return {
                                id: doc.id,
                                text: doc.data()['text'],
                                url: doc.data()['url'],
                            } as eduMaterials;
                        },
                    );
                    return materials.sort((a, b) => a.id.localeCompare(b.id));
                }),
            )
        );
    }
}
