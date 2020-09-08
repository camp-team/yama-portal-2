import { Algolia } from './util.ts/algolia';
import * as functions from 'firebase-functions';

const algolia = new Algolia();

export const createPost = functions
  .region('asia-northeast1')
  .firestore.document('posts/{id}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    return algolia.saveRecord({
      indexName: 'posts',
      largeConcentKey: 'body',
      data,
    });
  });

export const deletePost = functions
  .region('asia-northeast1')
  .firestore.document('posts/{id}')
  .onDelete((snap) => {
    const data = snap.data();

    if (data) {
      return algolia.removeRecord('posts', data.id);
    } else {
      return;
    }
  });

export const updatePost = functions
  .region('asia-northeast1')
  .firestore.document('posts/{id}')
  .onUpdate((change) => {
    const data = change.after.data();
    return algolia.saveRecord({
      indexName: 'posts',
      largeConcentKey: 'body',
      isUpdate: true,
      data,
    });
  });
