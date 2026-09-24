const coffeeMenu = ["Caramel Macchiato", "Cold Brew", "Espresso"];
let userClickHistory = []; 

const validationStatus = { isNameValid: false, isEmailValid: false };
const uiSettings = { errorColor: "red", successColor: "green" };


const dropdown = document.getElementById('coffeeDropdown');
const saveBtn = document.getElementById('saveDrinkBtn');
const savedMessage = document.getElementById('savedDrinkMessage');

const form = document.getElementById('contactForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const formSuccess = document.getElementById('formSuccess');


function loadSavedDrink() {
    const savedDrink = localStorage.getItem('favoriteCoffee');
    if (savedDrink) {
        savedMessage.textContent = "Welcome back! Your saved favorite is: " + savedDrink;
        dropdown.value = savedDrink;
    }
}

function saveFavoriteDrink() {
    const choice = dropdown.value;
    if (choice !== "") {
        localStorage.setItem('favoriteCoffee', choice);
        userClickHistory.push(choice); 
        savedMessage.textContent = "Awesome! We saved " + choice + " as your favorite.";
    } else {
        savedMessage.textContent = "Please pick a drink first.";
    }
}

// VALIDATION FUNCTIONS
function checkName() {
    if (nameInput.value.trim() === "") {
        nameError.textContent = "Please enter your name.";
        nameError.style.color = uiSettings.errorColor;
        validationStatus.isNameValid = false;
    } else {
        nameError.textContent = "";
        validationStatus.isNameValid = true;
    }
}

function checkEmail() {
    const emailText = emailInput.value.trim();
    if (emailText === "") {
        emailError.textContent = "Email is required.";
        validationStatus.isEmailValid = false;
    } else if (!emailText.includes("@") || !emailText.includes(".")) {
        emailError.textContent = "Please enter a valid email address.";
        validationStatus.isEmailValid = false;
    } else {
        emailError.textContent = "";
        validationStatus.isEmailValid = true;
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    checkName();
    checkEmail();

    if (validationStatus.isNameValid && validationStatus.isEmailValid) {
        formSuccess.textContent = "Thanks for reaching out! We will get back to you soon.";
        formSuccess.style.color = uiSettings.successColor; 
    } else {
        formSuccess.textContent = "";
    }
}


window.onload = loadSavedDrink;
saveBtn.addEventListener('click', saveFavoriteDrink);
form.addEventListener('submit', handleFormSubmit);
nameInput.addEventListener('input', checkName);
emailInput.addEventListener('input', checkEmail);
