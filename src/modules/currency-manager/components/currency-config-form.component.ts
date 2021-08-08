import { module, copy } from 'angular';

import { ICountryService } from '../services/country.service.def';

/**
 * CurrencyConfigForm Component
 * @param {*} $scope The scope
 * @param {ICountryService} countryService The country service
 */
function CurrencyConfigForm($scope: any, countryService: ICountryService) {
  this.countries = [];
  this.currencies = [];
  this.languages = [];

  this.$onInit = () => {
    countryService.loadData().then((data) => {
      this.countries = data.getCountries();
      this.currencies = data.getCurrencies();
      this.languages = data.getLanguages();
      $scope.$apply();
    });
  };

  this.hasError = (form: any, fieldName: string) => {
    const field = form[fieldName];
    if (form.$submitted || field.$touched) {
      if (field.$invalid) {
        return true;
      }
    }
    return false;
  };

  this.submit = (form: any) => {
    if (form.$valid) {
      this.onSubmit({ record: copy(this.record) });
      form.$setPristine();
      form.$setUntouched();
    } else {
      const [[field]] = Object.values(form.$error);
      const {
        $$element: [el],
      } = field;
      el.focus();
    }
  };
}

module('currency-manager').component('currencyConfigForm', {
  templateUrl: require('./currency-config-form.template.html').default,
  controller: CurrencyConfigForm,
  bindings: {
    record: '<',
    onSubmit: '&',
  },
});
