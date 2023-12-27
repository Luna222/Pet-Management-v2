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

/*******************************************************************************
 * Functions
 ******************************************************************************/
/**
 * @brief reset the original state of the Edit form: hidden
 */
const resetForm = function () {
  editFormEl.classList.add('hide');
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
    Edit.breedInput.value = pet.breed;
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

    const btnIdx = Array.from(btnsEdit).findIndex(btn => btn === e.target);
    const curPet = petArr[btnIdx];
    startEditPet(curPet);
  }
});

/**
 * @brief capture real-time changes and handle Type input event
 */
Edit.typeInput.addEventListener('input', () =>
  renderBreed(breedArr, Edit.typeInput, Edit.breedInput)
);
