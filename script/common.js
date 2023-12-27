'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
const KEY_PET = 'petArr';
const KEY_BREED = 'breedArr';

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

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
/**
 * @brief handle Sidebar Event
 */
sidebarBtnBurger.addEventListener('click', function () {
  sidebarEl.classList.toggle('active');
});
