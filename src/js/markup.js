import { refs } from './refs';
function renderInfoMarkup(data) {
  if (data.length === 1) {
    clearMarkup(refs.ul);
    const markupInfo = createInfoMarkup(data);
    refs.div.innerHTML = markupInfo;
  }
}

function renderListMarkup(data) {
  clearMarkup(refs.div);
  const markupList = createListMarkup(data);
  refs.ul.innerHTML = markupList;
}

function createListMarkup(data) {
  return data
    .map(
      ({ name, flags }) =>
        `<li class="list-item"><img class="list-img" src="${flags.svg}" alt="${name.official}" width="20" height="20"> <span class="list-markup">${name.official}</span></li>`
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

function clearMarkup(r) {
  return (r.innerHTML = '');
}

export {
  createInfoMarkup,
  createListMarkup,
  renderListMarkup,
  renderInfoMarkup,
  clearMarkup,
};
