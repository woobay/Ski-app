// Query selectors

let signupForm = document.querySelector('#validateNewUser');

let userName = document.querySelector('#userName');
let userNameIcon = document.querySelector('#userNameIcon');
let errorUserName = document.querySelector('#errorUserName');

let email = document.querySelector('#email');
let emailIcon = document.querySelector('#emailIcon')
let errorEmail = document.querySelector('#errorEmail');

let password = document.querySelector('#password');
let passwordIcon = document.querySelector('#passwordIcon');
let errorPassword = document.querySelector('#errorPassword');


// Username functions

userName.addEventListener('focus', function () {
    userNameIcon.style.color = 'black'
    userName.style.outline = "2px solid black";
})

userName.addEventListener('blur', validateUserName)

function validateUserName() {
    if (userName.value.trim() === "") {
        error = true;
        errorUserName.style.display = "block";
        userName.style.outline = "2px solid red";
        userNameIcon.style.color = 'red';
    } else {
        errorUserName.style.display = "none";
        userName.style.outline = "2px solid #0060AD";
        userNameIcon.style.color = '#0060AD';
    }
};

// Email functions

email.addEventListener('focus', function () {
    emailIcon.style.color = 'black'
    email.style.outline = "2px solid black";
})

email.addEventListener('blur', validateEmail)

function validateEmail() {
    let regex = /.+\@.+\..+/;
    if (!regex.test(email.value)) {
        error = true;
        errorEmail.style.display = "block";
        email.style.outline = "2px solid red";
        emailIcon.style.color = 'red';
    } else {
        errorEmail.style.display = "none";
        email.style.outline = "2px solid #0060AD";
        emailIcon.style.color = '#0060AD';
    }
};


// Password functions

password.addEventListener('focus', function () {
    passwordIcon.style.color = 'black'
    password.style.outline = "2px solid black";
})

password.addEventListener('blur', validatePassword)

function validatePassword() {
    if (password.value.trim() === "") {
        error = true;
        errorPassword.style.display = "block";
        password.style.outline = "2px solid red";
        passwordIcon.style.color = 'red';
    } else {
        errorPassword.style.display = "none";
        password.style.outline = "2px solid #0060AD";
        passwordIcon.style.color = '#0060AD';
    }
};


// Form validation

signupForm.addEventListener('submit', validate)

function validate(e) {
    error = false;
    validateUserName()
    validateEmail()
    validatePassword()
    if (error) {
        e.preventDefault();
    }
}


// Password visibility switch

passwordIcon.addEventListener('click', function () {
    if (password.type === "password") {
        passwordIcon.setAttribute('class', 'fa-regular fa-eye');
        password.type = "text";
    } else {
        passwordIcon.setAttribute('class', 'fa-regular fa-eye-slash');
        password.type = "password";
    }
})