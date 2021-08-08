import { IHttpService } from 'angular';

import { Country } from '../domains/country';
import { Currency } from '../domains/currency';
import { Language } from '../domains/language';
import { ICountryService, ICountryServiceResponse } from './country.service.def';

const API_URL = 'https://restcountries.eu/rest/v2/all';

type CountryDTO = {
  name: string;
  alpha2Code: string;
  // eslint-disable-next-line camelcase
  languages: { iso639_1: string; name: string }[];
  currencies: Currency[];
};

/**
 * CountryService
 * @param {IHttpService} $http The http service instance
 * @return {ICountryService} The service instance
 */
export class CountryService implements ICountryService {
  /**
   * @param {IHttpService} $http
   */
  constructor(private $http: IHttpService) {}

  /**
   * @return {Promise<CountryDTO[]>}
   */
  private async fetchCountries(): Promise<CountryDTO[]> {
    try {
      const response = await this.$http.get<CountryDTO[]>(API_URL);
      return response.data;
    } catch (e) {
      return [];
    }
  }

  /**
   * @param {CountryDTO[]} countries
   * @return {Country[]}
   */
  private getCountries(countries: CountryDTO[]): Country[] {
    return countries.map((item) => {
      const { name, alpha2Code: code } = item;
      return {
        name,
        code,
      };
    });
  }

  /**
   * @param {CountryDTO[]} countries
   * @return {Language[]}
   */
  private getLanguages(countries: CountryDTO[]): Language[] {
    const map = countries.reduce((result, item) => {
      const { languages } = item;
      const [{ iso639_1: code, name }] = languages;
      if (code && code !== '(none)') {
        result.set(code, { code, name });
      }
      return result;
    }, new Map<string, Language>());
    return Array.from(map.values()).sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  /**
   * @param {CountryDTO[]} countries
   * @return {Currency[]}
   */
  private getCurrencies(countries: CountryDTO[]): Currency[] {
    const map = countries.reduce((result, item) => {
      const { currencies } = item;
      const [{ code, name }] = currencies;
      if (code && code !== '(none)') {
        result.set(code, { code, name });
      }
      return result;
    }, new Map<string, Currency>());
    return Array.from(map.values()).sort((a, b) => (a.code > b.code ? 1 : -1));
  }

  /**
   * @return {Promise<ICountryServiceResponse>}
   */
  public async loadData(): Promise<ICountryServiceResponse> {
    return this.fetchCountries().then((data) => ({
      getCountries: () => this.getCountries(data),
      getLanguages: () => this.getLanguages(data),
      getCurrencies: () => this.getCurrencies(data),
    }));
  }
}
