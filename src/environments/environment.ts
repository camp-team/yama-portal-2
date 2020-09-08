// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  algolia: {
    appId: 'YTCNWA1M3V',
    searchKey: '266d4f34268aad279908ca35f27a5250',
  },
  stripe: {
    publicKey:
      'pk_test_51HKazNHfsoP9rVSqsQRzZuK6CkCeh0RmlXS8K4AVawsVH6gQIzMOUlP0WW06qSVEmOVgIWe3279JkhWYxE6l95TJ00zARaBlAO',
  },
  firebase: {
    apiKey: 'AIzaSyDDtE-uIhnFyjwkfXoPttqfmr-89zBvPOM',
    authDomain: 'yama-portal.firebaseapp.com',
    databaseURL: 'https://yama-portal.firebaseio.com',
    projectId: 'yama-portal',
    storageBucket: 'yama-portal.appspot.com',
    messagingSenderId: '573459282339',
    appId: '1:573459282339:web:62cda53ce81823b9e8c216',
    measurementId: 'G-B0Y97SH0ZH',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
