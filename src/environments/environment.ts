// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	backgroundApi: 'https://api.unsplash.com/photos/random/?client_id=b2698351b29cd4ed48f4205973ce312cdb11a61c71da5ae81a2c2630c2af3df1&collections=148982&orientation=landscape',
	loginUrl: 'http://localhost:4200',
	firebase: {
		apiKey: 'AIzaSyBT1a45gappk9yNTzbqVCcaxjKHyyLftQ4',
		authDomain: 'point-of-sale-5e574.firebaseapp.com',
		databaseURL: 'https://point-of-sale-5e574.firebaseio.com',
		projectId: 'point-of-sale-5e574',
		storageBucket: 'point-of-sale-5e574.appspot.com',
		messagingSenderId: '951585599142',
		appId: '1:951585599142:web:095f365f27ec53f15bce67',
		measurementId: 'G-9N5VFSGYNW'
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
