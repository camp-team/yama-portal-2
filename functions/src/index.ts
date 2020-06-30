import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
export * from './post.function';

admin.initializeApp();
const db = admin.firestore();

export const createUser = functions.auth.user().onCreate((user) => {
  return db.doc(`users/${user.uid}`).set({
    uid: user.uid,
    name: user.displayName,
    avaterURL: user.photoURL,
    email: user.email,
    createdAt: new Date(),
  });
});

export const deleteUser = functions.auth.user().onDelete((user) => {
  return db.doc(`users/${user.uid}`).delete();
});
