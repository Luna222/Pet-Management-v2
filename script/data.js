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
 * @brief validate Pet data
 *
 * @param {Object} petData - all data inputs of a Pet from form
 *
 * @returns {Boolean}
 */
const validatePetData = function (petData) {
  return (
    validateName(petData.name) &&
    validateAge(petData.age) &&
    validateType(petData.type) &&
    validateWeight(petData.weight) &&
    validateLength(petData.petLength) &&
    validateBreed(petData.breed)
  );
};

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
 *
 * @param {*} arr
 */
const updatePetRecords = function (arr) {
  // Get the first selected file
  const selectedfile = fileInput.files[0];
  let fileContent;

  const parseFileContent = function () {
    //read the file contents asynchronously
    if (selectedfile) {
      const reader = new FileReader();
      //as the file is successfully loaded:
      reader.onload = function (e) {
        try {
          fileContent = JSON.parse(e.target.result);

          fileContent.forEach(pet => {
            if (validatePetData(pet)) arr.push(pet);
          });
          //re-write Pet list saved in localStorage
          saveToStorage(KEY_PET, arr);
          console.log(fileContent);
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

  parseFileContent();
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
 * @brief handle importing Pets event: update Pet records & save to localStorage
 */
btnImport.addEventListener('click', function (e) {
  //prevent the page from re-loading after hitting button
  e.preventDefault();

  updatePetRecords(petArr);
});
