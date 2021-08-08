import { CurrencyDisplay } from './currency-display';
import { CurrencyPosition } from './currency-position';
import { NumberFormat } from './number-format';

export type CurrencyConfig = {
  language: string;
  show: CurrencyDisplay;
  where: CurrencyPosition;
  cents: boolean;
  format: NumberFormat;
};
