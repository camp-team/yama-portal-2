import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { markEventTried, shouldEventRun } from './util.ts/firebase-util';
const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user, context) => {
    const eventId = context.eventId;
    const should = await shouldEventRun(eventId);
    if (should) {
      await db.doc(`users/${user.uid}`).set({
        uid: user.uid,
        name: user.displayName,
        avaterURL: user.photoURL,
        email: user.email,
        createdAt: new Date(),
      });
      return markEventTried(eventId);
    } else {
      return true;
    }
  });

export const deleteUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete((user) => {
    return db.doc(`users/${user.uid}`).delete();
  });
