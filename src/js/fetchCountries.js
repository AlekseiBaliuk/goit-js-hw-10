const BASE_URL = 'https://restcountries.com/v3.1/name/';

export default class SearchCountries {
  constructor() {
    this.searchQuery = '';
  }
  fetchCountries() {
    return fetch(
      `${BASE_URL}${this.searchQuery}?fields=name,capital,population,flags,languages`
    ).then(this.responseFetchResult);
  }

  responseFetchResult(response) {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  }

  get data() {
    return this.searchQuery;
  }

  set data(newQuery) {
    this.searchQuery = newQuery;
  }
}

// ==========================================================================

// function fetchCountries(name) {
//   return fetch(
//     `${BASE_URL}${name}?fields=name,capital,population,flags,languages`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// export { fetchCountries };
