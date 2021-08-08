import { CurrencyConfig } from '../domains/currency-config';
import { CurrencyConfigRecord } from '../domains/currency-config-record';

export interface ICurrencyConfigsService {
  list(): CurrencyConfigRecord[];
  get(market: string, currency: string): CurrencyConfigRecord;
  save(market: string, currency: string, config: CurrencyConfig): void;
  remove(market: string, currency: string): void;
}
