import { Country } from '../domains/country';
import { Currency } from '../domains/currency';
import { Language } from '../domains/language';

export interface ICountryServiceResponse {
  getCountries(): Country[];
  getLanguages(): Language[];
  getCurrencies(): Currency[];
}

export interface ICountryService {
  loadData(): Promise<ICountryServiceResponse>;
}
