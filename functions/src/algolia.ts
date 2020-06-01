import * as functions from 'firebase-functions';
const algoliasearch = require('algoliasearch');
import * as admin from 'firebase-admin';

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex('posts');

export const addRecord = functions
  .region('asia-northeast1')
  .firestore.document('posts/{id}')
  .onCreate((snap, context) => {
    const data = snap.data() as {
      id: string;
      userId: string;
      imageURL: string;
      label: string;
      content: string;
      public: boolean;
      createdAt: admin.firestore.Timestamp;
    };
    const item = {
      ...data,
      objectID: data.id,
      createdAt: data.createdAt.toMillis(),
    };

    return index.saveObject(item);
  });
