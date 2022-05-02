// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyC-yVB-kpHTrMQWG7SqW4XBSzVd4MClQZE',
    authDomain: 'mecarun-9ddb3.firebaseapp.com',
    projectId: 'mecarun-9ddb3',
    storageBucket: 'mecarun-9ddb3.appspot.com',
    messagingSenderId: '100514102874',
    appId: '1:100514102874:web:9b34bf1377a5eb2a4e6263',
    measurementId: 'G-58JVXD6VGB'
  }, 
  languages: [
    {
      code: 'zh',
      display: '中文'
    }, {
      code: 'en',
      display: 'English'
    }
  ],
  UUID_NAMESPACE: '7dac5d95-d49a-4c0e-aa84-043dcbb75d0b'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
