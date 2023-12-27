'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
//select DOM elements
const idInput = document.querySelector('#input-id');
const nameInput = document.querySelector('#input-name');
const ageInput = document.querySelector('#input-age');
const typeInput = document.querySelector('#input-type');
const weightInput = document.querySelector('#input-weight');
const lengthInput = document.querySelector('#input-length');
const colorInput = document.querySelector('#input-color-1');
const breedInput = document.querySelector('#input-breed');
const vaccinatedInput = document.querySelector('#input-vaccinated');
const dewormedInput = document.querySelector('#input-dewormed');
const sterilizedInput = document.querySelector('#input-sterilized');
const btnSubmit = document.querySelector('#submit-btn');
const btnShow = document.querySelector('#healthy-btn');

const typeDefault = document.querySelector(
  '#input-type > option:first-child'
).value;
const breedDefault = document.querySelector(
  '#input-breed > option:first-child'
).value;

//create a namespace to distinguish different DOM elements of the SAME names
const Home = {};
Home.tbBodyEl = document.querySelector('tbody#tbody');

let btnBMI;

/*******************************************************************************
 * Functions
 ******************************************************************************/
/**
 * @brief create and style a new button to calc Pet BMIs
 *
 * @param {String} btnName - text content of button
 */
const addBtnBMI = function (btnName) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.classList.add('btn', 'btn-warning');
  btn.setAttribute('id', 'bmi-btn');
  btn.style.marginLeft = '0.25rem';
  btn.textContent = btnName;
  //add new button right after Show Healthy Pet/Show All Pet button
  btnShow.after(btn);
};

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
 * @brief render options for Breeds in form (according to pet Types)
 *
 * @param {Array} breedArray - current Breed list
 */
const renderBreed = function (breedArray) {
  //clear all Bread options BEFORE rendering
  clearBreeds();

  const breedNamesOfType = breedArray
    .filter(br => br.type === typeInput.value)
    .map(breedType => breedType.breed);

  breedNamesOfType.forEach(function (brName) {
    const option = document.createElement('option');
    option.textContent = brName;
    breedInput.appendChild(option);
  });
};

/**
 * @brief calculate Pet's bmi
 *
 * @param {Object} pet
 */
const calcBMI = function (pet) {
  pet.bmi =
    pet.type === 'Dog'
      ? ((pet.weight * 703) / pet.petLength ** 2).toFixed(2)
      : ((pet.weight * 886) / pet.petLength ** 2).toFixed(2);
};

/**
 * @brief display text on 'showing All Pet/showing Healthy Pet' button
 */
const displayBtnShow = function () {
  btnShow.textContent =
    healthyCheck === false ? 'Show Healthy Pet' : 'Show All Pet';
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
 * @param {String} petAge - pet Age input from form
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
 * @param {String} petWeight - pet Weight input from form
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
 * @param {String} petLength - pet Length input from form
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
 * @brief validate all required inputs from form
 *
 * @param {Object} petData - all data inputs of a Pet from form
 *
 * @returns {Boolean}
 */
const validateData = function (petData) {
  return (
    validateId(petData.id) &&
    validateName(petData.name) &&
    validateAge(petData.age) &&
    validateType(petData.type) &&
    validateWeight(petData.weight) &&
    validateLength(petData.petLength) &&
    validateBreed(petData.breed)
  );
};

/**
 * @brief clear all Breed options from Type input
 */
const clearBreeds = function () {
  Array.from(breedInput.children).forEach(opt => {
    if (opt.textContent !== breedDefault) opt.remove();
  });
};

/**
 * @brief clear all data inputs of the latest Pet from form
 */
const clearInput = () => {
  idInput.value = '';
  nameInput.value = '';
  ageInput.value = '';
  typeInput.value = typeDefault;
  weightInput.value = '';
  lengthInput.value = '';
  colorInput.value = '#212529';
  breedInput.value = breedDefault;
  clearBreeds();
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

/**
 * @brief delete a Pet from Pet array
 *
 * @param {String} petId
 *
 * @returns - void: exit the function
 */
const deletePetById = function (petId) {
  const petIndex = petArr.findIndex(pet => pet.id === petId);
  //confirm before delete Pet, then delete the pet passed into
  //only splice array when item is found
  if (petIndex > -1) {
    if (confirm('❗️Are you sure to delete this Pet?')) {
      petArr.splice(petIndex, 1);
      renderTableData(HOME_PAGE)(Home.tbBodyEl);
      alert('Pet deleted!');
    }
  } else {
    alert('Pet NOT found');
  }
  return;
};

/**
 * @brief initialize default state
 */
const init = function () {
  //remove 2 sample rows of pet records from HTML
  document
    .querySelectorAll('tbody#tbody > tr')
    .forEach(trNode => trNode.remove());

  //add BMI button next to Show Healthy Pet/Show All Pet button
  addBtnBMI('Calculate BMI');
  btnBMI = document.querySelector('#bmi-btn');
  //add BMI column to table
  addCol('BMI');

  //render table data as loading the page
  renderTableData(HOME_PAGE)(Home.tbBodyEl);
};
//call init functions, will be executed when loading the page
init();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
/**
 * @brief handle adding Pet event
 */
btnSubmit.addEventListener('click', function (e) {
  //prevent the page from re-loading after hitting 'Submit' button
  e.preventDefault();
  //get data inputs from form & store them into object data
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    petLength: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: '?',
    // dateAdded: new Date().toLocaleDateString(),
    dateAdded: formatDate(new Date()),
  };

  //validate data inputs, then add a new pet record & store Pet list in localStorage
  if (validateData(data)) {
    petArr.push(data);
    saveToStorage(KEY_PET, petArr);
    clearInput();

    /*
    [Optional] change 'healthyCheck' to false:
      to display ALL Pet whenever adding a new One
      for User Friendly Purpose
    */
    healthyCheck = false;
    displayBtnShow();

    renderTableData(HOME_PAGE)(Home.tbBodyEl);
    alert('Pet added!');
  }
});

/**
 * @brief handle deleting Pet event using Event Delegation
 */
Home.tbBodyEl.addEventListener('click', function (e) {
  //will handle the Event if the clicked element matches the .btn-danger selector (class of the delete buttons)
  if (e.target.matches('.btn-danger')) {
    const btnIdx = Array.from(btnsDelete).findIndex(btn => btn === e.target);
    const curPet =
      healthyCheck === false ? petArr[btnIdx] : healthyPetArr[btnIdx];
    deletePetById(curPet?.id);
    //re-write Pet list saved in localStorage
    saveToStorage(KEY_PET, petArr);
  }
});

/**
 * @brief handle showing All Pet/showing Healthy Pet event
 */
btnShow.addEventListener('click', function () {
  // healthyCheck = healthyCheck === false ? true : false;
  healthyCheck = !healthyCheck;

  displayBtnShow();
  renderTableData(HOME_PAGE)(Home.tbBodyEl);
});

/**
 * @brief handle Pet BMI Calculation event
 */
btnBMI.addEventListener('click', function () {
  petArr.forEach(pet => calcBMI(pet));
  //re-write Pet list saved in localStorage
  saveToStorage(KEY_PET, petArr);
  renderTableData(HOME_PAGE)(Home.tbBodyEl);
});

/**
 * @brief capture real-time changes and handle Type input event
 */
typeInput.addEventListener('change', () => renderBreed(breedArr));
