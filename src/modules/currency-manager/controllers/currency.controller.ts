import { module, copy, IWindowService } from 'angular';

import { CurrencyConfigRecord } from '../domains/currency-config-record';
import { CurrencyDisplay } from '../domains/currency-display';
import { CurrencyPosition } from '../domains/currency-position';
import { NumberFormat } from '../domains/number-format';
import { ICurrencyConfigsService } from '../services/currency-configs.service.def';

const defaultRecord: CurrencyConfigRecord = {
  market: 'US',
  currency: 'USD',
  config: {
    language: 'en',
    show: CurrencyDisplay.ISO,
    where: CurrencyPosition.ISO,
    cents: true,
    format: NumberFormat.ISO,
  },
};

/**
 * CurrencyController
 * @param {*} $scope The scope
 * @param {IWindowService} $window The window service instance
 * @param {ICurrencyConfigsService} currencyConfigsService The currency configs service instance
 */
function CurrencyController($scope: any, $window: IWindowService, currencyConfigsService: ICurrencyConfigsService) {
  $scope.record = {
    ...defaultRecord,
  };
  $scope.sampleNumber = 12345.6789;
  $scope.configs = currencyConfigsService.list();

  $scope.submit = (record: any): void => {
    currencyConfigsService.save(record.market, record.currency, copy(record.config));
    $scope.record = {
      ...defaultRecord,
    };
    $scope.configs = currencyConfigsService.list();
  };

  $scope.edit = (market: string, currency: string): void => {
    $scope.record = currencyConfigsService.get(market, currency);
  };

  $scope.delete = (market: string, currency: string): void => {
    currencyConfigsService.remove(market, currency);
    $scope.configs = currencyConfigsService.list();
  };

  $scope.downloadLink = (): string => {
    const configs = $scope.configs;
    const columns = 'Market,Currency,Show,Where,Cents,Format\n';
    const data = configs.reduce((acc: string, record: CurrencyConfigRecord) => {
      const {
        market,
        currency,
        config: { show, where, cents, format },
      } = record;
      const row = [market, currency, show, where, cents, `"${format}"`].join(',');
      return `${acc}${row}\n`;
    }, '');
    const document = `${columns}${data}`;
    const csv = `data:text/csv;charset=utf-8,${$window.encodeURIComponent(document)}`;
    return csv;
  };
}

module('currency-manager').controller('currencyController', [
  '$scope',
  '$window',
  'currencyConfigsService',
  CurrencyController,
]);
