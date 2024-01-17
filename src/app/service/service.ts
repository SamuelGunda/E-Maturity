/* import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class Service {
  private dbPath = '/user';

  user: AngularFirestoreCollection<User>;

  constructor(private db: AngularFirestore) {
    this.user = db.collection(this.dbPath);
  }

  getAll(): void {
    this.user.valueChanges().forEach(element => {
      console.log(element);
      console.log('halabala');
    });
  }

  get(id: string): any {
    return this.user.doc(id).valueChanges();
  }

  create(user: User): any {
    return this.user.add({ ...user });
  }

  update(id: string, data: any): Promise<void> {
    return this.user.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.user.doc(id).delete();
  }
} */