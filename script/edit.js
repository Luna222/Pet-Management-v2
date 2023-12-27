'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
//select DOM elements
const editFormEl = document.getElementById('container-form');

//create a namespace to distinguish different DOM elements of the SAME names
const Edit = {};
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
const startEditPet = function (petId) {
  const curPet = petArr.find(pet => pet.id === petId);

  const fillForm = function () {};
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
  }
});
