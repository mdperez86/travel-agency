import { module } from 'angular';

module('currency-manager').component('currencyConfigList', {
  templateUrl: require('./currency-config-list.template.html').default,
  bindings: {
    configs: '<',
    onEdit: '&',
    onDelete: '&',
  },
});
