'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
//select DOM elements
const btnImport = document.querySelector('#import-btn');
const btnExport = document.querySelector('#export-btn');

/*******************************************************************************
 * Functions
 ******************************************************************************/
/**
 * @brief save the JSON data as a file
 *
 * @param {Array} data - in JSON-like format
 * @param {Object} fileType
 * @param {String} fileName
 */
const saveDataToFile = function (data, fileType, fileName) {
  const blob = new Blob([JSON.stringify(data)], fileType);
  saveAs(blob, fileName);
};

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
/**
 * @brief handle exporting Pets event
 */
btnExport.addEventListener('click', function (e) {
  //prevent the page from re-loading after hitting button
  e.preventDefault();

  saveDataToFile(
    petArr,
    { type: 'application/json;charset=utf-8' },
    'pets.json'
  );
});
