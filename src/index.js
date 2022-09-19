import './css/styles.css';
// import { fetchCountries } from './js/fetchCountries';
import SearchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { renderInfoMarkup, renderListMarkup, clearMarkup } from './js/markup';
import { refs } from './js/refs';

const DEBOUNCE_DELAY = 300;
const MAX_COUNT = 10;

const searchCountries = new SearchCountries();

function inputHandler(e) {
  searchCountries.searchQuery = e.target.value.trim();

  if (!searchCountries.searchQuery) {
    clearMarkup(refs.ul);
    clearMarkup(refs.div);
    return;
  }

  searchCountries.fetchCountries().then(showCounties).catch(onErrorFetch);
}

function showCounties(data) {
  console.log(data);
  if (data.length > MAX_COUNT) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  renderListMarkup(data);
  renderInfoMarkup(data);
}

function onErrorFetch(e) {
  Notify.failure('Oops, there is no country with that name');
  console.log(e);
}

refs.input.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

// ==========================================================================

// function clearMarkup(r) {
//   return (r.innerHTML = '');
// }

// function inputHandler(e) {
//   const textInput = e.target.value.trim();

//   if (!textInput) {
//     clearMarkup(refs.ul);
//     clearMarkup(refs.div);
//     return;
//   }

//   fetchCountries(textInput)
//     .then(data => {
//       if (data.length > MAX_COUNT) {
//         Notify.info(
//           'Too many matches found. Please enter a more specific name.'
//         );
//         return;
//       }
//       renderMarkup(data);
//     })
//     .catch(error => {
//       console.log(error);
//       Notify.failure('Oops, there is no country with that name');
//     });
// }

// function renderMarkup(data) {
//   if (data.length === 1) {
//     clearMarkup(refs.ul);
//     const markupInfo = createInfoMarkup(data);
//     refs.div.innerHTML = markupInfo;
//   } else {
//     clearMarkup(refs.div);
//     const markupList = createListMarkup(data);
//     refs.ul.innerHTML = markupList;
//   }
// }

// function createListMarkup(data) {
//   return data
//     .map(
//       ({ name, flags }) =>
//         `<li class="list-item"><img class="list-img" src="${flags.svg}" alt="${name.official}" width="20" height="20"> <span class="list-markup">${name.official}</span></li>`
//     )
//     .join('');
// }

// function createInfoMarkup(data) {
//   return data
//     .map(
//       ({ name, capital, population, flags, languages }) =>
//         `<h1><img src="${flags.svg}" alt="${
//           name.official
//         } width="25" height="25"> ${name.official}</li>
//         <p class="info">Capital: <span class="span">${capital}</span></p>
//         <p class="info">Population: <span class="span">${population}</span></p>
//         <p class="info">Languages: <span class="span">${Object.values(
//           languages
//         )}</span></p>`
//     )
//     .join('');
// }

// refs.input.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));
