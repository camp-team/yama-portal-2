import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from '@interfaces/customer';
import { switchMap, shareReplay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customer$: Observable<Customer> = this.afAuth.user.pipe(
    switchMap((user) => {
      if (user) {
        return this.db.doc<Customer>(`customers/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }),
    shareReplay(1)
  );

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {}
}
