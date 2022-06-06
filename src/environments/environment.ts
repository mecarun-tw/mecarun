// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  languages: [
    {
      code: 'zh',
      display: '中文'
    }, {
      code: 'en',
      display: 'English'
    }
  ],
  UUID_NAMESPACE: '7dac5d95-d49a-4c0e-aa84-043dcbb75d0b',
  IMAGE_SIZE: {
    THUMBNAIL_MAX_WIDTH: 176, // px
    THUMBNAIL_MAX_HEIGHT: 176, // px
    IMAGE_MAX_WIDTH: 352, // px
    IMAGE_MAX_HEIGHT: 352 // px
  },
  EXTERNAL_LINK_SITES: [
    {
      SITE: 'MECARUN',
      IMAGE_URL: 'assets/images/mecarun-icon.png'
    }, {
      SITE: 'RUTEN',
      IMAGE_URL: 'assets/images/ruten-icon.png'
    }, {
      SITE: 'SHOPEE',
      IMAGE_URL: 'assets/images/shopee-icon.png'
    }, {
      SITE: 'PCSTORE',
      IMAGE_URL: 'assets/images/pcstore-icon.png'
    }, {
      SITE: 'FB',
      IMAGE_URL: 'assets/images/fb-icon.png'
    }, 
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
