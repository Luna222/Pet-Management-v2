'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
//create a namespace to distinguish different DOM elements of the SAME names
const Edit = {};
Edit.tbBodyEl = document.querySelector('tbody#tbody');

/*******************************************************************************
 * Functions
 ******************************************************************************/
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
