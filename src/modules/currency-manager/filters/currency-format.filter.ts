import { module } from 'angular';

import { CurrencyConfig } from '../domains/currency-config';
import { CurrencyDisplay } from '../domains/currency-display';
import { CurrencyPosition } from '../domains/currency-position';
import { NumberFormat } from '../domains/number-format';

/**
 * CurrencyFormatFilter
 * @param {number} input The number
 * @param {string} market The market
 * @param {string} currency The currency
 * @param {CurrencyConfig} config The config
 * @return {string} The formatted currency
 */
function CurrencyFormatFilter(input: number, market: string, currency: string, config: CurrencyConfig): string {
  const locale = `${config.language}-${market}`;
  let options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currency || 'USD',
  };

  if (config.show !== CurrencyDisplay.ISO) {
    options = {
      ...options,
      currencyDisplay: config.show,
    };
  }

  if (config.cents) {
    options = {
      ...options,
      minimumFractionDigits: 2,
    };
  } else {
    options = {
      ...options,
      maximumFractionDigits: 0,
    };
  }

  const formatter = new Intl.NumberFormat(locale, options);
  let parts = formatter.formatToParts(input);
  let currencyDisplay = '';
  let formatedNumber = '';

  if (config.where !== CurrencyPosition.ISO) {
    const { value } = parts.find(({ type }) => type === 'currency');
    currencyDisplay = value;
    parts = parts.filter(({ type }) => type !== 'literal' && type !== 'currency');
  }

  if (config.format === NumberFormat.ISO) {
    formatedNumber = parts.map(({ value }) => value).join('');
  } else {
    formatedNumber = parts.reduce((formated, { type, value }) => {
      let newValue = value;
      if (config.format === NumberFormat['#,###.##']) {
        if (type === 'group') {
          newValue = ',';
        }
        if (type === 'decimal') {
          newValue = '.';
        }
      } else {
        if (type === 'group') {
          newValue = '.';
        }
        if (type === 'decimal') {
          newValue = ',';
        }
      }
      return `${formated}${newValue}`;
    }, '');
  }

  if (config.where === CurrencyPosition.ISO) {
    return formatedNumber;
  }

  return config.where === CurrencyPosition.BEFORE
    ? `${currencyDisplay}${formatedNumber}`
    : `${formatedNumber}${currencyDisplay}`;
}

/**
 * CurrencyFormat
 * @return {CurrencyFormatFilter}
 */
function CurrencyFormat(): typeof CurrencyFormatFilter {
  return CurrencyFormatFilter;
}

module('currency-manager').filter('currencyFormat', CurrencyFormat);
