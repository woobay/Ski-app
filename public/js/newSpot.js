// Query selectors

let btnContainer = document.querySelector('#btnContainer');
let newTagText = document.querySelector('#newTagText');
let newTagBtn = document.querySelector('#newTagBtn');

let submitNewSpot = document.querySelector('#submitNewSpot');

let spotName = document.querySelector('#spotName');
let locationName = document.querySelector('#locationName');
let latitude = document.querySelector('#latitude');
let longitude = document.querySelector('#longitude');
let selectDifficulty = document.querySelector('#selectDifficulty');
let description = document.querySelector('#description');

let errorSpotName = document.querySelector('#errorSpotName');
let errorLocationName = document.querySelector('#errorLocationName');
let errorLatitude = document.querySelector('#errorLatitude');
let errorLongitude = document.querySelector('#errorLongitude');
let errorDifficulty = document.querySelector('#errorDifficulty');
let errorDescription = document.querySelector('#errorDescription');


// Create new tag function

newTagBtn.addEventListener('click', createNewTag);

function createNewTag() {
    let newTag = btnContainer.appendChild(document.createElement('div'));
    newTag.setAttribute('class', 'cb-button');
    let label = newTag.appendChild(document.createElement('label'));
    let checkbox = label.appendChild(document.createElement('input'));
    checkbox.type = "checkbox";
    label.appendChild(document.createElement('span')).textContent = newTagText.value;
};


// input validations functions

spotName.addEventListener('blur', validateSpotName);

function validateSpotName() {
    if (spotName.value.trim() === "") {
        error = true;
        errorSpotName.style.display = "block";
    } else {
        errorSpotName.style.display = "none";
    }
};


locationName.addEventListener('blur', validateLocationName);

function validateLocationName() {
    if (locationName.value.trim() === "") {
        error = true;
        errorLocationName.style.display = "block";
    } else {
        errorLocationName.style.display = "none";
    }
};


latitude.addEventListener('blur', validateLatitude);

function validateLatitude() {
    if (latitude.value.trim() === "") {
        error = true;
        errorLatitude.style.display = "block";
    } else {
        errorLatitude.style.display = "none";
    }
};


longitude.addEventListener('blur', validateLongitude);

function validateLongitude() {
    if (longitude.value.trim() === "") {
        error = true;
        errorLongitude.style.display = "block";
    } else {
        errorLongitude.style.display = "none";
    }
};


selectDifficulty.addEventListener('blur', validateDifficulty);

function validateDifficulty() {
    if (selectDifficulty.selectedIndex == 0) {
        error = true;
        errorDifficulty.style.display = "block";
    } else {
        errorDifficulty.style.display = "none";
    }
};


description.addEventListener('blur', validateDescription);

function validateDescription() {
    if (description.value.trim() === "") {
        error = true;
        errorDescription.style.display = "block";
    } else {
        errorDescription.style.display = "none";
    }
};


// Form validation

submitNewSpot.addEventListener('click', validate);

function validate(e) {
    error = false;
    validateSpotName();
    validateLocationName();
    validateLatitude();
    validateLongitude();
    validateDifficulty();
    validateDescription();
    if (error) {
        e.preventDefault();
    }
};


// reset form

function backToTop() {
    window.scrollTo(0, 0);
};