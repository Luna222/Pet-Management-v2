'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
//select DOM elements
const fileInput = document.querySelector('#input-file');
const btnImport = document.querySelector('#import-btn');
const btnExport = document.querySelector('#export-btn');

/*******************************************************************************
 * Functions
 ******************************************************************************/
/**
 * @brief validate JSON format of Pets
 *
 * @param {String} jsonString
 *
 * @returns {Boolean}
 */
const validatePetJSON = function (jsonString) {};

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

/**
 * @brief update Pet records & save to localStorage
 *
 * @param {Array} arr
 */
const updatePetRecords = function (arr) {
  // Get the first selected file
  const selectedfile = fileInput.files[0];
  let fileContent;

  const parseSaveFileContent = function () {
    //read the file contents asynchronously
    if (selectedfile) {
      const reader = new FileReader();
      //as the file is successfully loaded:
      reader.onload = function (e) {
        try {
          fileContent = JSON.parse(e.target.result);

          //for pet data that has the same ID as an existing pet, overwrite it with the NEW data:
          arr = arr.filter(
            pet => !fileContent.some(fPet => fPet.id === pet.id)
          );
          arr.push(...fileContent);

          //re-write Pet list saved in localStorage
          saveToStorage(KEY_PET, arr);
          alert('Data imported!');
        } catch (error) {
          // Handle the error
          alert('Error occurred while parsing JSON:', error);
        }
      };

      // Handle file reading error
      reader.onerror = () =>
        alert('Error occurred while reading the file ! 🙅‍♀️');

      reader.readAsText(selectedfile, 'UTF-8'); //read the file as text
    }
  };

  parseSaveFileContent();
};

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
/**
 * @brief handle exporting Pets event: save file with json extension
 */
btnExport.addEventListener('click', function (e) {
  //prevent the page from re-loading after hitting button
  e.preventDefault();

  //create & download json file
  saveDataToFile(
    petArr,
    { type: 'application/json;charset=utf-8' },
    'pets.json'
  );
});

/**
 * @brief handle importing Pets event
 */
btnImport.addEventListener('click', function (e) {
  //prevent the page from re-loading after hitting button
  e.preventDefault();

  //update Pet records & save to localStorage
  updatePetRecords(petArr);
});
