'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
//select DOM elements
//create a namespace to distinguish different DOM elements of the SAME names
const Search = {};
Search.idInput = document.querySelector('#input-id');
Search.nameInput = document.querySelector('#input-name');
Search.ageInput = document.querySelector('#input-age');
Search.typeInput = document.querySelector('#input-type');
Search.weightInput = document.querySelector('#input-weight');
Search.lengthInput = document.querySelector('#input-length');
Search.colorInput = document.querySelector('#input-color-1');
Search.breedInput = document.querySelector('#input-breed');
Search.vaccinatedInput = document.querySelector('#input-vaccinated');
Search.dewormedInput = document.querySelector('#input-dewormed');
Search.sterilizedInput = document.querySelector('#input-sterilized');
Search.btnFind = document.querySelector('#find-btn');

Search.tbBodyEl = document.querySelector('tbody#tbody');

let criteria, resArr;

/*******************************************************************************
 * Functions
 ******************************************************************************/
/**
 * @brief check if the form is empty
 *
 * @returns {Boolean}
 */
const isEmptyForm = function () {
  return (
    Search.typeInput.value == typeDefault &&
    Search.breedInput.value == breedDefault &&
    !Search.idInput.value &&
    !Search.nameInput.value &&
    !Search.vaccinatedInput.checked &&
    !Search.dewormedInput.checked &&
    !Search.sterilizedInput.checked
  );
};

/**
 * @brief render options for ALL Breeds in form
 *
 * @param {Array} breedArray - current Breed list
 * @param {String} breedInput
 */
const renderAllBreed = function (breedArray, breedInput) {
  //clear all Bread options BEFORE rendering
  clearBreeds(breedInput);

  const breedNames = new Set(breedArray.map(br => br.breed));

  [...breedNames].forEach(brName => {
    const option = document.createElement('option');
    option.textContent = brName;
    breedInput.appendChild(option);
  });
};

/**
 * @brief check characters included in the query input
 *
 * @param {String} data - Pet data
 * @param {String} query - query input from form
 *
 * @returns {Boolean} - returns `true` if there is a match, and `false` otherwise
 */
// const matchChar = (data, query) => {
//   //creates a regex using the 'i' flag for case-insensitive matching
//   const regex = new RegExp(query, 'i');
//   return regex.test(data);
// };

const matchChar = (data, query) => {
  return data.includes(query);
};

/**
 * @brief check conditions for Id
 *
 * @param {*} pet
 *
 * @returns {Boolean}
 */
const checkId = pet =>
  matchChar(pet.id.toLowerCase(), Search.idInput.value.toLowerCase().trim());

const checkName = pet =>
  matchChar(
    pet.name.toLowerCase(),
    Search.nameInput.value.toLowerCase().trim()
  );

const checkType = pet => pet.type === Search.typeInput.value;

const checkBreed = pet => pet.breed === Search.breedInput.value;

const checkVaccinated = pet =>
  pet.vaccinated === Search.vaccinatedInput.checked;

const checkDewormed = pet => pet.dewormed === Search.dewormedInput.checked;

const checkSterilized = pet =>
  pet.sterilized === Search.sterilizedInput.checked;

const isPassed = function (pet) {
  let check = true;
  if (isEmptyForm()) check = false;

  criteria.forEach(cr => {
    switch (cr) {
      case Search.idInput:
        if (!checkId(pet)) check = false;
        break;
      case Search.nameInput:
        if (!checkName(pet)) check = false;
        break;
      case Search.typeInput:
        if (!checkType(pet)) check = false;
        break;
      case Search.breedInput:
        if (!checkBreed(pet)) check = false;
        break;
      case Search.vaccinatedInput:
        if (Search.vaccinatedInput.checked && !checkVaccinated(pet))
          check = false;
        break;
      case Search.dewormedInput:
        if (Search.dewormedInput.checked && !checkDewormed(pet)) check = false;
        break;
      case Search.sterilizedInput:
        if (Search.sterilizedInput.checked && !checkSterilized(pet))
          check = false;
    }
  });
  return check;
};

const addCriterionClass = function () {
  const className = 'criterion';
  document
    .querySelectorAll('form input')
    .forEach(input => input.classList.add(className));

  document
    .querySelectorAll('form select')
    .forEach(sel => sel.classList.add(className));
};

/**
 * @brief initialize default state
 */
const initSearch = function () {
  //add crirerion class to inputs in the form
  addCriterionClass();
  //add BMI column to table
  addCol('BMI');
};
//call init functions, will be executed when loading the page
initSearch();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
/**
 * @brief handle Breed input event when the user has made the active focus on this field
 */
Search.breedInput.addEventListener('focus', () =>
  renderAllBreed(breedArr, Search.breedInput)
);

/**
 * @brief handle finding Pet event according to ALL criteria inputted
 */
Search.btnFind.addEventListener('click', function (e) {
  //prevent the page from re-loading after hitting 'Submit' button
  e.preventDefault();

  criteria = Array.from(document.querySelectorAll('.criterion')).filter(
    input =>
      input.value && input.value !== typeDefault && input.value !== breedDefault
  );

  // resArr = petArr.filter(pet => pet.id === Search.idInput.value);
  resArr = petArr.filter(isPassed);

  //render table data matching the criteria
  renderTableData(SEARCH_PAGE, resArr)(Search.tbBodyEl);
});
