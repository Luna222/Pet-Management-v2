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

let resArr;

/*******************************************************************************
 * Functions
 ******************************************************************************/
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

const checkId = pet => pet.id === Search.idInput.value;

const checkName = pet => pet.name === Search.nameInput.value;

const checkType = pet => pet.type === Search.typeInput.value;

const checkBreed = pet => pet.breed === Search.breedInput.value;

const checkVaccinated = pet =>
  pet.vaccinated === Search.vaccinatedInput.checked;

const checkDewormed = pet => pet.dewormed === Search.dewormedInput.checked;

const checkSterilized = pet =>
  pet.sterilized === Search.sterilizedInput.checked;

const isPassed = function (pet) {
  return (
    checkId(pet) &&
    checkName(pet) &&
    checkType(pet) &&
    checkDewormed(pet) &&
    checkBreed(pet)
  );
};

/**
 * @brief initialize default state
 */
const initSearch = function () {
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

  // resArr = petArr.filter(pet => pet.id === Search.idInput.value);
  resArr = petArr.filter(isPassed);

  //render table data matching the criteria
  renderTableData(SEARCH_PAGE, resArr)(Search.tbBodyEl);
});
