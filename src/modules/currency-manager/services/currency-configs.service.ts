import { module } from 'angular';

import { CurrencyConfig } from '../domains/currency-config';
import { CurrencyConfigRecord } from '../domains/currency-config-record';
import { ICurrencyConfigsService } from './currency-configs.service.def';

const STORAGE_KEY = 'CurrencyConfigRecords';

/**
 * CurrencyConfigsService
 * @return {ICurrencyConfigsService} The service instance
 */
function CurrencyConfigsService(): ICurrencyConfigsService {
  const getConfigs = (): CurrencyConfigRecord[] => {
    const currencyConfigs = window.localStorage.getItem(STORAGE_KEY);
    return JSON.parse(currencyConfigs) || [];
  };

  const findIndex = (configs: CurrencyConfigRecord[], market: string, currency: string): number => {
    return configs.findIndex((config) => config.market === market && config.currency === currency);
  };

  const list = (): CurrencyConfigRecord[] => {
    return getConfigs().sort((a, b) => {
      if (`${a.market}${a.currency}` >= `${b.market}${b.currency}`) {
        return 1;
      }
      return -1;
    });
  };

  const get = (market: string, currency: string): CurrencyConfigRecord => {
    const configs = getConfigs();
    const index = findIndex(configs, market, currency);
    return index >= 0 ? getConfigs()[index] : null;
  };

  const save = (market: string, currency: string, config: CurrencyConfig): void => {
    const configs = getConfigs();
    const index = findIndex(configs, market, currency);
    if (index >= 0) {
      configs[index].config = config;
    } else {
      configs.push({
        market,
        currency,
        config: { ...config },
      });
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
  };

  const remove = (market: string, currency: string): void => {
    const configs = getConfigs();
    const index = findIndex(configs, market, currency);
    if (index >= 0) {
      configs.splice(index, 1);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
    }
  };

  return {
    list,
    save,
    get,
    remove,
  };
}

module('currency-manager').factory('currencyConfigsService', CurrencyConfigsService);
