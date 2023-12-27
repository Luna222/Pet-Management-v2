'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
const KEY_PET = 'petArr';
const KEY_BREED = 'breedArr';

const HOME_PAGE = 'home';
const EDIT_PAGE = 'edit';

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
 */
const renderTableData = function (page) {
  let petArray = petArr;
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
      ${page === HOME_PAGE ? `<td>${pet.bmi}</td>` : ''}
      <td>${pet.dateAdded}</td>
      <td><button type="button" class="btn btn-${btnType}">${action}</button>
      </td>
    </tr>`;
    });
    tbBodyEl.innerHTML = tbodyInner;
    page === HOME_PAGE ? getBtnsDelete() : getBtnsEdit();
  };
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
