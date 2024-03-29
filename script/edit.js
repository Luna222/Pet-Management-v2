'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
//select DOM elements
const editFormEl = document.getElementById('container-form');

//create a namespace to distinguish different DOM elements of the SAME names
const Edit = {};
Edit.idInput = document.querySelector('#input-id');
Edit.nameInput = document.querySelector('#input-name');
Edit.ageInput = document.querySelector('#input-age');
Edit.typeInput = document.querySelector('#input-type');
Edit.weightInput = document.querySelector('#input-weight');
Edit.lengthInput = document.querySelector('#input-length');
Edit.colorInput = document.querySelector('#input-color-1');
Edit.breedInput = document.querySelector('#input-breed');
Edit.vaccinatedInput = document.querySelector('#input-vaccinated');
Edit.dewormedInput = document.querySelector('#input-dewormed');
Edit.sterilizedInput = document.querySelector('#input-sterilized');
Edit.btnSubmit = document.querySelector('#submit-btn');

Edit.tbBodyEl = document.querySelector('tbody#tbody');

let curPet;

/*******************************************************************************
 * Functions
 ******************************************************************************/
/**
 * @brief reset the original state of the Edit form: hidden
 */
const resetForm = () => editFormEl.classList.add('hide');

/**
 * @brief clear focuses from fields in form
 */
const clearFieldFocus = function () {
  Edit.nameInput.blur();
  Edit.ageInput.blur();
  Edit.typeInput.blur();
  Edit.weightInput.blur();
  Edit.lengthInput.blur();
  Edit.colorInput.blur();
  Edit.breedInput.blur();
};

/**
 * @brief validate all required inputs from form
 *
 * @returns {Boolean}
 */
const validatePetData = function () {
  return (
    validateName(Edit.nameInput.value) &&
    validateAge(parseInt(Edit.ageInput.value)) &&
    validateType(Edit.typeInput.value) &&
    validateWeight(parseInt(Edit.weightInput.value)) &&
    validateLength(parseInt(Edit.lengthInput.value)) &&
    validateBreed(Edit.breedInput.value)
  );
};

/**
 * @brief retrieve info of the current Pet that needs to be edited, shown in the form
 *
 * @param {String} petId
 */
const startEditPet = function (pet) {
  const fillForm = function () {
    Edit.idInput.value = pet.id;
    Edit.nameInput.value = pet.name;
    Edit.ageInput.value = pet.age;
    Edit.typeInput.value = pet.type;
    Edit.weightInput.value = pet.weight;
    Edit.lengthInput.value = pet.petLength;
    Edit.colorInput.value = pet.color;

    //select the correct value in the Breed select element
    const option = document.createElement('option');
    option.textContent = pet.breed;
    Edit.breedInput.appendChild(option);
    option.selected = true;

    Edit.vaccinatedInput.checked = pet.vaccinated;
    Edit.dewormedInput.checked = pet.dewormed;
    Edit.sterilizedInput.checked = pet.sterilized;
  };
  fillForm();
};

/**
 * @brief initialize default state
 */
const initEdit = function () {
  //render Edit table data as loading the page
  renderTableData(EDIT_PAGE)(Edit.tbBodyEl);
};
//call init functions, will be executed when loading the page
initEdit();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
/**
 * @brief handle editing Pet event using Event Delegation
 */
Edit.tbBodyEl.addEventListener('click', function (e) {
  //will handle the Event if the clicked element matches the .btn-warning selector (class of the edit buttons)
  if (e.target.matches('.btn-warning')) {
    editFormEl.classList.remove('hide');
    clearBreeds(Edit.breedInput);

    const btnIdx = Array.from(btnsEdit).findIndex(btn => btn === e.target);
    curPet = petArr[btnIdx];
    startEditPet(curPet);
  }
});

/**
 * @brief handle Type input event when the user has made a selection
 */
Edit.typeInput.addEventListener('change', () =>
  renderBreed(breedArr, Edit.typeInput, Edit.breedInput)
);

/**
 * @brief handle Breed input event when the user has made the active focus on this field
 */
Edit.breedInput.addEventListener('focus', () =>
  renderBreed(breedArr, Edit.typeInput, Edit.breedInput)
);

/**
 * @brief refill name input field when it loses focus w/o changes
 */
Edit.nameInput.addEventListener('blur', () => {
  if (!Edit.nameInput.value) Edit.nameInput.value = curPet.name;
});

/**
 * @brief refill age input field when it loses focus w/o changes
 */
Edit.ageInput.addEventListener('blur', () => {
  if (!Edit.ageInput.value) Edit.ageInput.value = curPet.age;
});

/**
 * @brief refill weight input field when it loses focus w/o changes
 */
Edit.weightInput.addEventListener('blur', () => {
  if (!Edit.weightInput.value) Edit.weightInput.value = curPet.weight;
});

/**
 * @brief refill length input field when it loses focus w/o changes
 */
Edit.lengthInput.addEventListener('blur', () => {
  if (!Edit.lengthInput.value) Edit.lengthInput.value = curPet.petLength;
});

/**
 * @brief handle submiting Pet editing event
 */
Edit.btnSubmit.addEventListener('click', function (e) {
  clearFieldFocus();

  //prevent the page from re-loading after hitting 'Submit' button
  e.preventDefault();

  //validate data inputs, then update the current Pet in petArr & save to localStorage
  if (validatePetData()) {
    curPet.name = Edit.nameInput.value.trim();
    curPet.age = parseInt(Edit.ageInput.value);
    curPet.type = Edit.typeInput.value;
    curPet.weight = parseInt(Edit.weightInput.value);
    curPet.petLength = parseInt(Edit.lengthInput.value);
    curPet.color = Edit.colorInput.value;
    curPet.breed = Edit.breedInput.value;
    curPet.vaccinated = Edit.vaccinatedInput.checked;
    curPet.dewormed = Edit.dewormedInput.checked;
    curPet.sterilized = Edit.sterilizedInput.checked;

    //re-write Pet list saved in localStorage
    saveToStorage(KEY_PET, petArr);
    resetForm();

    renderTableData(EDIT_PAGE)(Edit.tbBodyEl);
    alert('Pet updated!');
  }
});
