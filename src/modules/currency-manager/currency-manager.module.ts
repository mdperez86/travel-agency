import { ICompileProvider, module } from 'angular';

import { CountryService } from './services/country.service';

module('currency-manager', [])
  .config([
    '$compileProvider',
    function ($compileProvider: ICompileProvider) {
      $compileProvider.aHrefSanitizationTrustedUrlList(/^\s*(data):/);
    },
  ])
  .service('countryService', ['$http', CountryService]);
