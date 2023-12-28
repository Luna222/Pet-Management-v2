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
 * @brief clear all data inputs of the latest Pet from form
 */
const clearSearchInput = () => {
  Search.idInput.value = '';
  Search.nameInput.value = '';
  Search.typeInput.value = typeDefault;
  Search.breedInput.value = breedDefault;
  clearBreeds(Search.breedInput);
  Search.vaccinatedInput.checked = false;
  Search.dewormedInput.checked = false;
  Search.sterilizedInput.checked = false;
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
 * @brief handle finding Pet event according to criteria inputted
 */
Search.btnFind.addEventListener('click', function (e) {
  //prevent the page from re-loading after hitting 'Submit' button
  e.preventDefault();

  resArr = petArr.filter(pet => pet.id === Search.idInput.value);

  //render table data matching the criteria
  renderTableData(SEARCH_PAGE, resArr)(Search.tbBodyEl);
});
