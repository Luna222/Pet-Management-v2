'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
//select DOM elements
const sidebarBtnBurger = document.getElementById('sidebar-title');
const sidebarEl = document.getElementById('sidebar');

const typeDefault = document.querySelector(
  '#input-type > option:first-child'
)?.value;
const breedDefault = document.querySelector(
  '#input-breed > option:first-child'
)?.value;

const KEY_PET = 'petArr';
const KEY_BREED = 'breedArr';

const HOME_PAGE = 'home';
const EDIT_PAGE = 'edit';
const SEARCH_PAGE = 'search';

/*
If the 'petArr' key is not found in localStorage:
  [] will be returned as the default value
*/
const petArr = getFromStorage(KEY_PET, []);

/*
If the 'breedArr' key is not found in localStorage:
  [] will be returned as the default value
*/
const breedArr = getFromStorage(KEY_BREED, []);

let healthyCheck = false;
let healthyPetArr, btnType, action, btnsDelete, btnsEdit;

/*******************************************************************************
 * Functions
 ******************************************************************************/
/**
 * @brief create a new label column for the data table
 *
 * @param {String} colName - text content of label
 */
const addCol = function (colName) {
  const th = document.createElement('th');
  th.textContent = colName;
  //add new label right after 'Sterilized'
  document.querySelector('thead tr > th:nth-child(11)').after(th);
};

/**
 * @brief format Date based on locales
 *
 * @param {Date} date
 */
const formatDate = function (date) {
  let localeBrowser, localeVI, localeUS, options;

  /**
   * @brief general configuration
   */
  const config = function () {
    //get locale from User's Browser
    localeBrowser = navigator.language;

    //Viet locale
    localeVI = 'vi-VN';

    //US locale
    localeUS = 'en-US';

    //formatting date & time
    options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      // weekday: 'long',
    };
  };

  config();
  return new Intl.DateTimeFormat(localeVI, options).format(date);
};

/**
 * @brief validate Id input from form
 *
 * @param {String} petId - petId input from form
 *
 * @returns {Boolean}
 */
const validateId = function (petId) {
  let isValid = true;
  //check if id field is empty
  if (petId === '') {
    alert('Please input for Pet ID!');
    isValid = false;
  }

  //check if id already existed
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id === petId) {
      alert('ID must be unique!');
      isValid = false;
    }
  }
  return isValid;
};

/**
 * @brief validate Name input from form
 *
 * @param {String} petName - pet Name input from form
 *
 * @returns {Boolean}
 */
const validateName = function (petName) {
  let isValid = true;
  //check if name field is empty
  if (petName === '') {
    alert('Please input for Pet Name!');
    isValid = false;
  }
  return isValid;
};

/**
 * @brief validate Age input from form
 *
 * @param {Number} petAge - pet Age input from form
 *
 * @returns {Boolean}
 */
const validateAge = function (petAge) {
  let isValid = true;
  //check if age field is empty
  if (!petAge) {
    alert('Please input for Age!');
    isValid = false;
  }

  //check age range
  if (petAge < 1 || petAge > 15) {
    alert('Age must be between 1 and 15!');
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
const validateType = function (petType) {
  let isValid = true;
  //check if type field is invalid
  if (petType === typeDefault) {
    alert('Please input for Type!');
    isValid = false;
  }
  return isValid;
};

/**
 * @brief validate Weight input from form
 *
 * @param {Number} petWeight - pet Weight input from form
 *
 * @returns {Boolean}
 */
const validateWeight = function (petWeight) {
  let isValid = true;
  //check if weight field is empty
  if (!petWeight) {
    alert('Please input for Weight!');
    isValid = false;
  }

  //check weight range
  if (petWeight < 1 || petWeight > 15) {
    alert('Weight must be between 1 and 15!');
    isValid = false;
  }
  return isValid;
};

/**
 * @brief validate Length input from form
 *
 * @param {Number} petLength - pet Length input from form
 *
 * @returns {Boolean}
 */
const validateLength = function (petLength) {
  let isValid = true;
  //check if length field is empty
  if (!petLength) {
    alert('Please input for Length!');
    isValid = false;
  }

  //check length range
  if (petLength < 1 || petLength > 100) {
    alert('Length must be between 1 and 100!');
    isValid = false;
  }
  return isValid;
};

/**
 * @brief validate Breed input from form
 *
 * @param {String} petBreed - pet Breed input from form
 *
 * @returns {Boolean}
 */
const validateBreed = function (petBreed) {
  let isValid = true;
  //check if breed field is invalid
  if (petBreed === breedDefault) {
    alert('Please input for Breed!');
    isValid = false;
  }
  return isValid;
};

/**
 * @brief check conditions for a healthy Pet
 *
 * @param {Object} pet
 * @returns {Boolean} - Pets matched the required conditions
 */
const isHealthy = function (pet) {
  return pet.vaccinated && pet.dewormed && pet.sterilized;
};

/**
 * @brief retrieve dynamic 'Edit' button elements
 */
const getBtnsEdit = function () {
  btnsEdit = document.querySelectorAll('tbody > tr .btn-warning');
  btnsEdit.forEach(btn => btn.setAttribute('action', 'edit'));
};

/**
 * @brief retrieve dynamic 'Delete' button elements
 */
const getBtnsDelete = function () {
  btnsDelete = document.querySelectorAll('tbody > tr .btn-danger');
  btnsDelete.forEach(btn => btn.setAttribute('action', 'delete'));
};

/**
 * @brief render dynamic table data of Pets/ all related to table displays according to pages
 *
 * @param {String} page
 * @param {Array} petArray
 *
 * @returns {Function}
 */
const renderTableData = function (page, petArray = petArr) {
  let tbodyInner = ``;

  //setups
  switch (page) {
    case HOME_PAGE:
      btnType = 'danger';
      action = 'Delete';
      healthyPetArr = petArr.filter(isHealthy);
      petArray = healthyCheck === false ? petArr : healthyPetArr;
      break;
    case EDIT_PAGE:
      btnType = 'warning';
      action = 'Edit';
  }

  /**
   * @param {Element} tbBodyEl
   */
  return function (tbBodyEl) {
    petArray.forEach(pet => {
      tbodyInner += `<tr>
      <th scope="row">${pet.id}</th>
      <td>${pet.name}</td>
      <td>${pet.age}</td>
      <td>${pet.type}</td>
      <td>${pet.weight} kg</td>
      <td>${pet.petLength} cm</td>
      <td>${pet.breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
      </td>
      <td><i class="${
        pet.vaccinated === true
          ? 'bi bi-check-circle-fill'
          : 'bi bi-x-circle-fill'
      }"></i></td>
      <td><i class="${
        pet.dewormed === true
          ? 'bi bi-check-circle-fill'
          : 'bi bi-x-circle-fill'
      }"></i></td>
      <td><i class="${
        pet.sterilized === true
          ? 'bi bi-check-circle-fill'
          : 'bi bi-x-circle-fill'
      }"></i></td>
      ${page === HOME_PAGE || page === SEARCH_PAGE ? `<td>${pet.bmi}</td>` : ''}
      <td>${pet.dateAdded}</td>
      ${
        page === HOME_PAGE || page === EDIT_PAGE
          ? `<td><button type="button" class="btn btn-${btnType}">${action}</button></td>`
          : ''
      }
    </tr>`;
    });
    tbBodyEl.innerHTML = tbodyInner;

    if (page === HOME_PAGE) getBtnsDelete();
    if (page === EDIT_PAGE) getBtnsEdit();
  };
};

/**
 * @brief clear all Breed options from Type input
 */
const clearBreeds = function (breedInput) {
  Array.from(breedInput.children).forEach(opt => {
    if (opt.textContent !== breedDefault) opt.remove();
  });
};

/**
 * @brief render options for Breeds in form (according to pet Types)
 *
 * @param {Array} breedArray - current Breed list
 * @param {String} typeInput
 * @param {String} breedInput
 */
const renderBreed = function (breedArray, typeInput, breedInput) {
  //clear all Bread options BEFORE rendering
  clearBreeds(breedInput);

  const breedNamesOfType = breedArray
    .filter(br => br.type === typeInput.value)
    .map(breedType => breedType.breed);

  breedNamesOfType.forEach(function (brName) {
    const option = document.createElement('option');
    option.textContent = brName;
    breedInput.appendChild(option);
  });
};

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
/**
 * @brief handle Sidebar Event
 */
sidebarBtnBurger.addEventListener('click', function () {
  sidebarEl.classList.toggle('active');
});
