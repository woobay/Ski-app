// Query selectors

let loginForm = document.querySelector('#log');

let emailDiv = document.querySelector('#emailDiv');
let email = document.querySelector('#email');
let emailIcon = document.querySelector('#emailIcon')
let errorEmail = document.querySelector('#errorEmail');

let passwordDiv = document.querySelector('#passwordDiv');
let password = document.querySelector('#password');
let passwordIcon = document.querySelector('#passwordIcon');
let errorPassword = document.querySelector('#errorPassword');


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

loginForm.addEventListener('click', validate)

function validate(e) {
    error = false;
    validateEmail()
    validatePassword()
    if (error) {
        e.preventDefault();
    }
}


// Password visibility switch

passwordIcon.addEventListener('click', function () {
    if (password.type === "password") {
        passwordIcon.setAttribute('class', 'fa-regular fa-eye icon');
        password.type = "text";
    } else {
        passwordIcon.setAttribute('class', 'fa-regular fa-eye-slash icon');
        password.type = "password";
    }
})
const log = document.querySelector("#log");
const login = async () => {

    const emailValue = document.querySelector("#email").value;
    const passwordValue = document.querySelector("#password").value;
    console.log(emailValue, passwordValue)
    if (!!emailValue && !!passwordValue) {
        const body = JSON.stringify({ email: emailValue, password: passwordValue });
        const response = await fetch(`https://ski-api.herokuapp.com/login`, {
            method: 'POST',
            body, 
            headers: { 'Content-Type': 'application/json',
            'Accept': 'application/json'}
        });
        const data = await response.json();
        
        if (!!data.token) {
            window.localStorage.setItem('ACCESS_TOKEN', data.token);
            window.localStorage.setItem('NAME', data.name);
            window.location.replace("/profil"); 
        }
    }
}
log.addEventListener("click", login)

