import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
const MAX_COUNT = 10;

const refs = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};

function clearMarkup(r) {
  return (r.innerHTML = '');
}

function inputHandler(e) {
  const textInput = e.target.value.trim();

  if (!textInput) {
    clearMarkup(refs.ul);
    clearMarkup(refs.div);
    return;
  }

  fetchCountries(textInput)
    .then(data => {
      if (data.length > MAX_COUNT) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      renderMarkup(data);
    })
    .catch(error => {
      console.log(error);
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderMarkup(data) {
  if (data.length === 1) {
    clearMarkup(refs.ul);
    const markupInfo = createInfoMarkup(data);
    refs.div.innerHTML = markupInfo;
  } else {
    clearMarkup(refs.div);
    const markupList = createListMarkup(data);
    refs.ul.innerHTML = markupList;
  }
}

function createListMarkup(data) {
  return data
    .map(
      ({ name, flags }) =>
        `<li class="list-item"><img class="list-img" src="${flags.svg}" alt="${name.official} width="20" height="20"> <span class="list-markup">${name.official}</span></li>`
    )
    .join('');
}

function createInfoMarkup(data) {
  return data
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<h1><img src="${flags.svg}" alt="${
          name.official
        } width="25" height="25"> ${name.official}</li>
        <p class="info">Capital: <span class="span">${capital}</span></p>
        <p class="info">Population: <span class="span">${population}</span></p>
        <p class="info">Languages: <span class="span">${Object.values(
          languages
        )}</span></p>`
    )
    .join('');
}

refs.input.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));
