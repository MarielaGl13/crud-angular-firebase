// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebaseConfig :{
    apiKey: 'AIzaSyCApp4vdiJZKVcAnEZzrr6ZgDQ1NTYU5cs',
    databaseURL: 'https://crud-eb6cc.firebaseio.com',
    authDomain: 'crud-eb6cc.firebaseapp.com',
    projectId: 'crud-eb6cc',
    storageBucket: 'crud-eb6cc.appspot.com',
    messagingSenderId: '499168890916',
    appId: "1:499168890916:web:cb4e5be7272f6bd208c8b1"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
