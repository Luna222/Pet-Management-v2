'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
//select DOM elements
//create a namespace to distinguish different DOM elements of the SAME names
const Breed = {};
Breed.breedInput = document.querySelector('#input-breed');
Breed.typeInput = document.querySelector('#input-type');
Breed.tbBodyEl = document.querySelector('tbody#tbody');
Breed.btnSubmit = document.querySelector('#submit-btn');
Breed.typeDefault = document.querySelector(
  '#input-type > option:first-child'
).value;

let count = 0;

/*******************************************************************************
 * Functions
 ******************************************************************************/
/**
 * @brief retrieve dynamic 'Delete' button elements
 */
const getBtnsDeleteBr = function () {
  Breed.btnsDelete = document.querySelectorAll('tbody > tr .btn-danger');
  Breed.btnsDelete.forEach(btn => btn.setAttribute('action', 'delete'));
};

/**
 * @brief render dynamic table data of Pet Breeds
 *
 * @param {Array} breedArray - current Breed list
 */
const renderBreedTable = function (breedArray) {
  let tbodyInner = ``;

  breedArray.forEach((br, idx) => {
    tbodyInner += `<tr>
    <td>${idx + 1}</td>
    <td>${br.breed}</td>
    <td>${br.type}</td>
    <td><button type="button" class="btn btn-danger">Delete</button></td>
  </tr>`;
  });
  Breed.tbBodyEl.innerHTML = tbodyInner;
  getBtnsDeleteBr();
};

/**
 * @brief validate Breed input from form
 *
 * @param {String} petBreed - pet Breed input from form
 *
 * @returns {Boolean}
 */
Breed.validateBreed = function (petBreed) {
  let isValid = true;
  //check if breed field is empty
  if (!petBreed) {
    alert('Please input for Breed!');
    isValid = false;
  }
  return isValid;
};

/**
 * @brief validate Type input from form
 *
 * @param {String} petType - pet Type input from form
 *
 * @returns {Boolean}
 */
Breed.validateType = function (petType) {
  let isValid = true;
  //check if type field is invalid
  if (petType === Breed.typeDefault) {
    alert('Please input for Type!');
    isValid = false;
  }
  return isValid;
};

/**
 * @brief validate all required inputs from form
 *
 * @param {Object} breedData - all data inputs of a Breed from form
 *
 * @returns {Boolean}
 */
const validateBreedData = function (breedData) {
  //check if breed already exists
  let isDuplicate = false;

  if (
    breedArr.find(
      br => br.breed === breedData.breed && br.type === breedData.type
    )
  ) {
    alert(`This Breed name with ${breedData.type} type already exists!`);
    isDuplicate = true;
  }

  return (
    Breed.validateBreed(breedData.breed) &&
    Breed.validateType(breedData.type) &&
    isDuplicate === false
  );
};

/**
 * @brief clear all data inputs of the latest Breed from form
 */
const clearInput = () => {
  Breed.breedInput.value = '';
  Breed.typeInput.value = Breed.typeDefault;
};

/**
 * @brief delete a Breed from Breed array
 *
 * @param {String} breedId
 *
 * @returns - void: exit the function
 */
const deleteBreedById = function (breedId) {
  const breedIdx = breedArr.findIndex(br => br.id === breedId);
  //confirm before delete Breed, then delete the Breed passed into
  //only splice array when item is found
  if (breedIdx > -1) {
    if (confirm('❗️Are you sure to delete this Breed?')) {
      breedArr.splice(breedIdx, 1);
      renderBreedTable(breedArr);
      alert('Breed deleted!');
    }
  } else {
    alert('Breed NOT found');
  }
  return;
};

/**
 * @brief initialize default state
 */
const initBreed = function () {
  //render Breed table data as loading the page
  renderBreedTable(breedArr);
};
//call init functions, will be executed when loading the page
initBreed();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
/**
 * @brief handle adding Breed event
 */
Breed.btnSubmit.addEventListener('click', function (e) {
  //prevent the page from re-loading after hitting 'Submit' button
  e.preventDefault();
  //get data inputs from form & store them into object data
  const data = {
    //make up Breed Id for at least N thousands records
    id: `BR${(++count + '').padStart(4, 0)}`,
    breed: Breed.breedInput.value.trim(),
    type: Breed.typeInput.value,
  };

  //validate data inputs, then add a new Breed record & store Breed list in localStorage
  if (validateBreedData(data)) {
    breedArr.push(data);
    saveToStorage(KEY_BREED, breedArr);
    clearInput();

    renderBreedTable(breedArr);
    alert('Breed added!');
  }
});

/**
 * @brief handle deleting Breed event using Event Delegation
 */
Breed.tbBodyEl.addEventListener('click', function (e) {
  //will handle the Event if the clicked element matches the .btn-danger selector (class of the delete buttons)
  if (e.target.matches('.btn-danger')) {
    const btnIdx = Array.from(Breed.btnsDelete).findIndex(
      btn => btn === e.target
    );
    const curBreed = breedArr[btnIdx];
    deleteBreedById(curBreed?.id);
    //re-write Pet list saved in localStorage
    saveToStorage(KEY_BREED, breedArr);

    //[Optional] re-set count value to 0 if Breed array is empty
    if (breedArr.length === 0) count = 0;
  }
});
